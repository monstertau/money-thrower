package validator

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
	"time"
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
	if form.StartAmount > form.EndAmount || form.EndAmount < 0 {
		return errors.New("start amount should smaller than end amount")
	}
	if time.Unix(form.StartDate, 0).After(time.Unix(form.EndDate, 0)) {
		return errors.New("start date should before end date")
	}
	return nil
}
