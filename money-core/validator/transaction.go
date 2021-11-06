package validator

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	TransactionValidatorInterface interface {
		ValidateFilterForm(form *view.FilterTransactionForm) error
	}
	TransactionValidator struct {
		repo *repository.Repositories
	}
)

func NewTransactionValidator(repo *repository.Repositories) *TransactionValidator {
	return &TransactionValidator{repo: repo}
}

func (v *TransactionValidator) ValidateFilterForm(form *view.FilterTransactionForm) error {
	if form.StartAmount > form.EndAmount || form.EndAmount <= 0 {
		return errors.New("start amount should smaller than end amount")
	}
	if form.StartDate.After(form.EndDate) {
		return errors.New("start date should before end date")
	}
	return nil
}
