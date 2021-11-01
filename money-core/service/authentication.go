package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	AuthServiceInterface interface {
		Register(form *view.RegisterForm) error
		Logout(token string) error
	}
	AuthService struct {
		repositories *repository.Repositories
	}
)

func NewAuthenticationService(repositories *repository.Repositories) *AuthService {
	return &AuthService{
		repositories: repositories,
	}
}

func (s *AuthService) Register(form *view.RegisterForm) error {
	user, err := s.repositories.UserRepo.Create(form)
	if err != nil {
		return errors.Wrap(err, "in create user")
	}
	form.Id = user.Id
	form.Password = ""
	return nil
}

func (s *AuthService) Logout(token string) error {
	return s.repositories.RedisRepo.SetBlacklistJWT(token)
}
