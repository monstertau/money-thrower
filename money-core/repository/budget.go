package repository

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/util"
	"time"
)

type (
	BudgetRepoInterface interface {
		SyncBudgetStatus(userId string) error
		GetById(userId string, id string) (*model.Budget, error)
		GetList(userId string) ([]*model.Budget, error)
		DeleteById(userId string, id string) error
		GetSpentAmount(budget *model.Budget) (float64, error)
	}
	BudgetRepo struct {
		dbConn *gorm.DB
	}
)

func NewBudgetRepo(dbConn *gorm.DB) *BudgetRepo {
	return &BudgetRepo{dbConn: dbConn}
}

func (r *BudgetRepo) SyncBudgetStatus(userId string) error {
	tx := r.dbConn.Model(&model.Budget{}).Where("user_id = ?", userId)
	tx.Where("? BETWEEN start_date AND end_date", time.Now())
	if err := tx.Update("status", 1).Error; err != nil {
		return fmt.Errorf("failed to sync budget status: %s", err)
	}

	t := r.dbConn.Model(&model.Budget{}).Where("user_id = ?", userId)
	t.Where("? NOT BETWEEN start_date AND end_date", time.Now())
	if err := t.Update("status", 0).Error; err != nil {
		return fmt.Errorf("failed to sync budget status: %s", err)
	}

	return nil
}

func (r *BudgetRepo) GetById(userId string, id string) (*model.Budget, error) {
	budget := &model.Budget{}

	if err := r.SyncBudgetStatus(userId); err != nil {
		return nil, fmt.Errorf("failed to sync budget status: %s", err)
	}
	if err := r.dbConn.First(&budget, "id = ? AND user_id = ?", id, userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return budget, nil
}

func (r *BudgetRepo) GetList(userId string) ([]*model.Budget, error) {
	var budgetList []*model.Budget

	if err := r.SyncBudgetStatus(userId); err != nil {
		return nil, fmt.Errorf("failed to sync budget status: %s", err)
	}
	tx := r.dbConn.Where("user_id = ?", userId)
	if err := tx.Find(&budgetList).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return budgetList, nil
}

func (r *BudgetRepo) DeleteById(userId string, id string) error {
	budget := &model.Budget{}
	if err := r.dbConn.Delete(&budget, "id = ? AND user_id = ?", id, userId).Error; err != nil {
		return fmt.Errorf("failed to execute delete query: %s", err)
	}
	return nil
}

func (r *BudgetRepo) GetSpentAmount(budget *model.Budget) (float64, error) {
	var spentAmount float64
	var transactions []*model.Transaction
	// Query transactions
	tx := r.dbConn.Where("user_id = ?", budget.UserId)
	tx.Where("wallet_id = ?", budget.WalletId)
	tx.Where("cat_id = ?", budget.CatId)
	tx.Where("transaction_date BETWEEN ? AND ?", budget.StartDate, time.Now())
	if err := tx.Find(&transactions).Error; err != nil {
		return 0, fmt.Errorf("failed to execute select query: %s", err)
	}
	// Take category info
	category := &model.Category{}
	if err := r.dbConn.First(&category, "id=? AND (owner_id=? OR owner_id=?)", budget.CatId, budget.UserId, util.NilId).Error; err != nil {
		return 0, errors.Errorf("failed to execute select query: %s", err)
	}
	// Loop through all transaction and calculate spent amount
	for _, transaction := range transactions {
		if category.IsExpense && transaction.Note != "Initialize Wallet" {
			spentAmount += transaction.Amount
		}
	}
	return spentAmount, nil
}
