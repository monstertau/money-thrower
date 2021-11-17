package service

import (
	"github.com/pkg/errors"
	"money-core/model"
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
	"time"
)

type (
	TransactionServiceInterface interface {
		GetDetail(form *view.TransactionForm) (*view.TransactionForm, error)
		Delete(form *view.DeleteTransactionForm) error
		GetFilteredList(userId string, form *view.FilterTransactionForm) (*view.FilterTransactionForm, error)
		GetAllTransactions(userId string) (*view.FilterTransactionForm, error)
		AddTransactions(form *view.AddTransactionForm, isExpense bool) (*view.AddTransactionForm, error)
		EditTransactions(form *view.EditTransactionForm, walletId string, newAmount float64) (*view.EditTransactionForm, error)
		GetTransactions(form *view.EditTransactionForm) (*model.Transaction, error)
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

func (s *TransactionService) GetDetail(form *view.TransactionForm) (*view.TransactionForm, error) {
	// TODO
	return nil, nil
}

func (s *TransactionService) Delete(form *view.DeleteTransactionForm) error {
	// TODO
	return nil
}

func (s *TransactionService) GetFilteredList(userId string, form *view.FilterTransactionForm) (*view.FilterTransactionForm, error) {
	// TODO
	return nil, nil
}

func (s *TransactionService) GetAllTransactions(userId string) (*view.FilterTransactionForm, error) {
	// TODO
	return nil, nil
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

func (s *TransactionService) GetTransactions(form *view.EditTransactionForm) (*model.Transaction, error) {
	transaction, err := s.repositories.TransactionRepo.GetById(form.TransactionId)
	if err != nil {
		return nil, errors.Errorf("Invalid transaction_id")
	}
	return transaction, nil
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
