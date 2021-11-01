package validator

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	ForgotPasswordValidatorInterface interface {
		ValidateForgotPasswordForm(form *view.ForgotPasswordForm) error
	}
	ForgotPasswordValidator struct {
		repositories *repository.Repositories
	}
)

func NewForgotPasswordValidator(repositories *repository.Repositories) *ForgotPasswordValidator {
	return &ForgotPasswordValidator{repositories: repositories}
}

func (v *ForgotPasswordValidator) ValidateForgotPasswordForm(form *view.ForgotPasswordForm) error {
	if form.Email == "" {
		return errors.New("Cant find email field")
	}
	user, err := v.repositories.UserRepo.FindByEmail(form.Email)
	if err != nil || user == nil {
		return errors.Errorf("Cant find user for email: %v", form.Email)
	}
	return nil
}
