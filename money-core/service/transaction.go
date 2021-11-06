package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
)

type (
	TransactionServiceInterface interface {
		GetById(userId string, id string) (*view.TransactionForm, error)
		DeleteById(userId string, id string) error
		GetList(userId string, limit int, offset int) ([]*view.TransactionForm, error)
		GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*view.TransactionForm, error)
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

func (s TransactionService) GetById(userId string, id string) (*view.TransactionForm, error) {
	transaction, err := s.repositories.TransactionRepo.GetById(userId, id)
	if err != nil {
		return nil, errors.Errorf("error in find transaction: %v", err)
	}
	return view.ToTransactionForm(transaction), nil
}

func (s TransactionService) DeleteById(userId string, id string) error {
	err := s.repositories.TransactionRepo.DeleteById(userId, id)
	if err != nil {
		return errors.Errorf("error in delete transaction: %v", err)
	}
	return nil
}

func (s TransactionService) GetList(userId string, limit int, offset int) ([]*view.TransactionForm, error) {
	transactionForms := make([]*view.TransactionForm, 0)
	transactions, err := s.repositories.TransactionRepo.GetList(userId, limit, offset)
	if err != nil {
		return make([]*view.TransactionForm, 0), errors.Errorf("error in find transactions: %v", err)
	}
	for _, transaction := range transactions {
		transactionForm := view.ToTransactionForm(transaction)
		transactionForms = append(transactionForms, transactionForm)
	}
	return transactionForms, nil
}

func (s TransactionService) GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*view.TransactionForm, error) {
	transactionForms := make([]*view.TransactionForm, 0)
	transactions, err := s.repositories.TransactionRepo.GetFilteredList(userId, limit, offset, form)
	if err != nil {
		return make([]*view.TransactionForm, 0), errors.Errorf("error in find transactions: %v", err)
	}
	for _, transaction := range transactions {
		transactionForm := view.ToTransactionForm(transaction)
		transactionForms = append(transactionForms, transactionForm)
	}
	return transactionForms, nil
}
