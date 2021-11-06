package repository

import (
	"fmt"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
)

type (
	TransactionRepoInterface interface {
		GetById(userId string, id string) (*model.Transaction, error)
		DeleteById(userId string, id string) error
		GetList(userId string, limit int, offset int) ([]*model.Transaction, error)
		GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*model.Transaction, error)
	}
	TransactionRepo struct {
		dbConn *gorm.DB
	}
)

func NewTransactionRepo(dbConn *gorm.DB) *TransactionRepo {
	return &TransactionRepo{dbConn: dbConn}
}

func (r *TransactionRepo) GetById(userId string, id string) (*model.Transaction, error) {
	transaction := &model.Transaction{}
	if err := r.dbConn.First(&transaction, "id=? AND user_id=?", id, userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return transaction, nil
}

func (r *TransactionRepo) DeleteById(userId string, id string) error {
	transaction := &model.Transaction{}
	if err := r.dbConn.Delete(&transaction, "id=? AND user_id=?", id, userId).Error; err != nil {
		return fmt.Errorf("failed to execute delete query: %s", err)
	}
	return nil
}

func (r *TransactionRepo) GetList(userId string, limit int, offset int) ([]*model.Transaction, error) {
	var list []*model.Transaction
	if err := r.dbConn.Limit(limit).Offset(offset).Find(&list, "user_id=?", userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return list, nil
}

func (r *TransactionRepo) GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	var filteredList []*model.Transaction
	if err := r.dbConn.Limit(limit).Offset(offset).Find(&filteredList, "user_id=? "+
		"AND wallet_id=? AND cat_id=? AND "+
		"transaction_date BETWEEN ? AND ? AND "+
		"amount BETWEEN ? AND ? AND "+
		"note LIKE ?", userId, form.WalletId, form.CatId, form.StartDate, form.EndDate, form.StartAmount, form.EndAmount, "%"+form.KeyNote+"%").Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return filteredList, nil
}
