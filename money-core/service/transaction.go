package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
	"time"
)

type (
	TransactionServiceInterface interface {
		GetById(userId string, id string) (*view.TransactionForm, error)
		DeleteById(userId string, id string) error
		GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*view.TransactionForm, error)
		AddTransactions(form *view.AddTransactionForm, isExpense bool) (*view.AddTransactionForm, error)
		EditTransactions(form *view.EditTransactionForm, walletId string, newAmount float64) (
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

func (s *TransactionService) AddTransactions(form *view.AddTransactionForm, isExpense bool) (*view.AddTransactionForm, error) {
	if form.TransactionDate == 0 {
		form.TransactionDate = time.Now().Unix()
	}
	transaction, err := s.repositories.TransactionRepo.Create(form)
	if err != nil {
		return nil, errors.Errorf("Failed when creating transaction %s", err)
	}

	// transfer money
	if err := s.repositories.WalletRepo.UpdateAmount(form.WalletId, form.Amount, isExpense); err != nil {
		return nil, errors.Errorf("Failed when updating wallet")
	}

	form.TransactionId = transaction.Id
	return form, nil
}

func (s *TransactionService) EditTransactions(form *view.EditTransactionForm, walletId string, newAmount float64) (*view.EditTransactionForm, error) {
	// update transaction
	if err := s.repositories.TransactionRepo.Edit(form); err != nil {
		return nil, errors.Errorf("%s", err)
	}

	// Update balance of wallet
	if err := s.repositories.WalletRepo.UpdateAmount(walletId, newAmount, false); err != nil {
		return nil, errors.Errorf("%s", err)
	}

	return form, nil
}
