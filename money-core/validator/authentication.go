package validator

import (
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
	"money-core/repository"
	"money-core/view"
	"regexp"
)

type (
	AuthValidatorInterface interface {
		ValidateLoginForm(form *view.LoginForm) error
		ValidateRegisterForm(form *view.RegisterForm) error
		ValidatePassword(password string) error
	}
	AuthValidator struct {
		repositories *repository.Repositories
	}
)

func NewAuthValidator(repositories *repository.Repositories) *AuthValidator {
	return &AuthValidator{repositories: repositories}
}

func (v *AuthValidator) ValidateLoginForm(form *view.LoginForm) error {
	user, err := v.repositories.UserRepo.FindByEmail(form.Email)
	if err != nil || user == nil {
		return errors.Errorf("Cant find user for email: %v", form.Email)
	}

	if err := v.checkPasswordHash(user.Password, form.Password); err != nil {
		return errors.New("Wrong password")
	}

	return nil
}

func (v *AuthValidator) ValidateRegisterForm(form *view.RegisterForm) error {
	if ok := v.validateEmail(form.Email); !ok {
		return errors.Errorf("invalid email: %v", form.Email)
	}
	if err := v.ValidatePassword(form.Password); err != nil {
		return errors.Wrap(err, "invalid password")
	}
	user, err := v.repositories.UserRepo.FindByEmail(form.Email)
	if err == nil || user != nil {
		return errors.Errorf("Email had existed: %v", form.Email)
	}
	return nil
}

func (v *AuthValidator) validateEmail(email string) bool {
	emailRegex := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return emailRegex.MatchString(email)
}

func (v *AuthValidator) ValidatePassword(password string) error {
	if len(password) < 8 {
		return errors.New("password must contains at least 8 characters")
	}
	return nil
}

func (v *AuthValidator) checkPasswordHash(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
