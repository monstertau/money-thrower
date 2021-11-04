package service

import (
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
)

type (
	TransactionServiceInterface interface {
		GetDetail(form *view.TransactionForm) (*view.TransactionForm, error)
		Delete(form *view.DeleteTransactionForm) error
		GetFilteredList(userId string, form *view.FilterTransactionForm) (*view.FilterTransactionForm, error)
		GetAllTransactions(userId string) (*view.FilterTransactionForm, error)
	}
	TransactionService struct {
		validator    *validator.Validator
		repositories *repository.Repositories
	}
)

func NewTransactionService(validator *validator.Validator, repositories *repository.Repositories) *TransactionService {
	return &TransactionService{
		validator:    validator,
		repositories: repositories,
	}
}

func (s TransactionService) GetDetail(form *view.TransactionForm) (*view.TransactionForm, error) {
	return nil, nil
}

func (s TransactionService) Delete(form *view.DeleteTransactionForm) error {
	return nil
}

func (s TransactionService) GetFilteredList(userId string, form *view.FilterTransactionForm) (*view.FilterTransactionForm, error) {
	return nil, nil
}

func (s TransactionService) GetAllTransactions(userId string) (*view.FilterTransactionForm, error) {
	return nil, nil
}
