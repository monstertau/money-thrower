package validator

import (
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
	// TODO
	return nil
}
