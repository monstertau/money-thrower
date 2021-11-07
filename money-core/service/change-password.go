package service

import (
	"github.com/go-redis/redis/v8"
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	PasswordServiceInterface interface {
		ForgotPassword(email string, token string) error
		CheckSentMail(email string) error
		ResetPassword(form *view.SubmitNewPasswordForm) error
		ValidateToken(token string, email string) error
	}
	PasswordService struct {
		repositories *repository.Repositories
	}
)

func NewPasswordService(repositories *repository.Repositories) *PasswordService {
	return &PasswordService{
		repositories: repositories,
	}
}

func (f *PasswordService) ForgotPassword(email string, token string) error {
	// and add key to redis
	err := f.repositories.RedisRepo.SetForgotToken(email, token)
	if err != nil {
		return errors.Wrap(err, "in forgot password")
	}
	return nil
}

func (f *PasswordService) ResetPassword(form *view.SubmitNewPasswordForm) error {
	if err := f.ValidateToken(form.Token, form.Email); err != nil {
		return err
	}

	// update password and remove token
	if err := f.repositories.UserRepo.UpdatePassword(form.Email, form.Password); err != nil {
		return errors.Errorf("Can not update password: %v", err)
	}

	// Remove token from redis
	f.repositories.RedisRepo.DeleteToken(form.Email)
	return nil
}

func (f *PasswordService) ValidateToken(token string, email string) error {
	tok, err := f.repositories.RedisRepo.GetForgotTokenFromMail(email)
	if err != nil || tok != token {
		return errors.New("Invalid token")
	}
	return nil
}

func (f *PasswordService) CheckSentMail(email string) error {
	// Check key in redis
	_, err := f.repositories.RedisRepo.GetForgotTokenFromMail(email)
	if err != redis.Nil {
		return errors.New("Already sent. Try again in few minute")
	}
	return nil
}
