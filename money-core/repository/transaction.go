package repository

import (
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
)

type (
	TransactionRepoInterface interface {
		GetById(id string) (*model.Transaction, error)
		DeleteById(id string) error
		FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error)
	}
	TransactionRepo struct {
		dbConn *gorm.DB
	}
)

func NewTransactionRepo(dbConn *gorm.DB) *TransactionRepo {
	return &TransactionRepo{dbConn: dbConn}
}

func (r *TransactionRepo) GetById(id string) (*model.Transaction, error) {
	return nil, nil
}

func (r *TransactionRepo) DeleteById(id string) error {
	return nil
}

func (r *TransactionRepo) FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	return nil, nil
}
