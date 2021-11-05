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
		Create(form *view.TransactionForm) (*model.Transaction, error)
	}
	TransactionRepo struct {
		dbConn *gorm.DB
	}
)

func NewTransactionRepo(dbConn *gorm.DB) *TransactionRepo {
	return &TransactionRepo{dbConn: dbConn}
}

func (r *TransactionRepo) GetById(id string) (*model.Transaction, error) {
	// TODO
	return nil, nil
}

func (r *TransactionRepo) DeleteById(id string) error {
	// TODO
	return nil
}

func (r *TransactionRepo) FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	// TODO
	return nil, nil
}

func (r *TransactionRepo) Create(form *view.TransactionForm) (*model.Transaction, error) {
	TransactionModel := form.ToAddTransactionModel()
	if result := r.dbConn.Create(TransactionModel); result.Error != nil || result.RowsAffected != 1 {
		return nil, errors.Errorf("failed to execute insert query: %s", result.Error)
	}
	return TransactionModel, nil
}
