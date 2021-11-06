package repository

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
)

type (
	TransactionRepoInterface interface {
		GetById(id string) (*model.Transaction, error)
		DeleteById(id string) error
		FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error)
		Create(form *view.AddTransactionForm) (*model.Transaction, error)
		Edit(form *view.EditTransactionForm) error
	}
	TransactionRepo struct {
		dbConn *gorm.DB
	}
)

func NewTransactionRepo(dbConn *gorm.DB) *TransactionRepo {
	return &TransactionRepo{dbConn: dbConn}
}

func (r *TransactionRepo) GetById(id string) (*model.Transaction, error) {
	transaction := &model.Transaction{}
	if err := r.dbConn.First(transaction, "id=?", id).Error; err != nil {
		return nil, errors.Errorf("failed to execute select query: %s", err)
	}
	return transaction, nil
}

func (r *TransactionRepo) DeleteById(id string) error {
	// TODO
	return nil
}

func (r *TransactionRepo) FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	// TODO
	return nil, nil
}

func (r *TransactionRepo) Create(form *view.AddTransactionForm) (*model.Transaction, error) {
	TransactionModel := form.ToTransactionModel()
	if result := r.dbConn.Create(TransactionModel); result.Error != nil || result.RowsAffected != 1 {
		return nil, errors.Errorf("failed to execute insert query: %s", result.Error)
	}
	return TransactionModel, nil
}

func (r *TransactionRepo) Edit(form *view.EditTransactionForm) error {
	newTransaction := form.ToTransactionModel()
	if err := r.dbConn.Updates(newTransaction).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}
