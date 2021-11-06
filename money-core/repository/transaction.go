package repository

import (
	"fmt"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
)

type (
	TransactionRepoInterface interface {
		GetById(id string, userId string) (*model.Transaction, error)
		DeleteById(id string, userId string) error
		ListTransactions(userId string, limit int, offset int) ([]*model.Transaction, error)
		FilteredTransactions(form *view.FilterTransactionForm) ([]*model.Transaction, error)
	}
	TransactionRepo struct {
		dbConn *gorm.DB
	}
)

func NewTransactionRepo(dbConn *gorm.DB) *TransactionRepo {
	return &TransactionRepo{dbConn: dbConn}
}

func (r *TransactionRepo) GetById(id string, userId string) (*model.Transaction, error) {
	transaction := &model.Transaction{}
	if err := r.dbConn.First(&transaction, "id=? AND user_id=?", id, userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return transaction, nil
}

func (r *TransactionRepo) DeleteById(id string, userId string) error {
	transaction := &model.Transaction{}
	if err := r.dbConn.Delete(&transaction, "id=? AND user_id=?", id, userId).Error; err != nil {
		return fmt.Errorf("failed to execute delete query: %s", err)
	}
	return nil
}

func (r *TransactionRepo) ListTransactions(userId string, limit int, offset int) ([]*model.Transaction, error) {
	var list []*model.Transaction
	if err := r.dbConn.Limit(limit).Offset(offset).Find(&list, "user_id=?", userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return list, nil
}

func (r *TransactionRepo) FilteredTransactions(userId string, form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	var filteredList []*model.Transaction
	if err := r.dbConn.Limit(form.Limit).Offset(form.Offset).Find(&filteredList, "user_id=? "+
		"AND wallet_id=? AND cat_id=? AND "+
		"transaction_date BETWEEN ? AND ? AND "+
		"amount BETWEEN ? AND ? AND "+
		"note LIKE ?", userId, form.WalletId, form.CatId, form.StartDate, form.EndDate, form.StartAmount, form.EndAmount, "%"+form.KeyNote+"%").Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return filteredList, nil
}
