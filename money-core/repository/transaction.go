package repository

import (
	"fmt"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
	"time"
)

type (
	TransactionRepoInterface interface {
		GetById(userId string, id string) (*model.Transaction, error)
		DeleteById(userId string, id string) error
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

func (r *TransactionRepo) GetFilteredList(userId string, limit int, offset int, form *view.FilterTransactionForm) ([]*model.Transaction, error) {
	var filteredList []*model.Transaction

	tx := r.dbConn.Limit(limit).Offset(offset).Where("user_id = ?", userId)
	if form.WalletId != "" {
		tx.Where("wallet_id = ?", form.WalletId)
	}
	if form.CatId != "" {
		tx.Where("cat_id = ?", form.CatId)
	}
	if form.StartDate != 0 || form.EndDate != 0 {
		tx.Where("transaction_date BETWEEN ? AND ?", time.Unix(form.StartDate, 0), time.Unix(form.EndDate, 0))
	}
	if form.StartAmount != 0 || form.EndAmount != 0 {
		tx.Where("amount BETWEEN ? AND ?", form.StartAmount, form.EndAmount)
	}
	if form.KeyNote != "" {
		tx.Where("note LIKE ?", "%"+form.KeyNote+"%")
	}

	if err := tx.Find(&filteredList).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}

	return filteredList, nil
}
