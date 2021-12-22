package repository

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/util"
	"money-core/view"
	"time"
)

type (
	WalletRepoInterface interface {
		Create(form *view.WalletForm) (*model.Wallet, error)
		GetById(id string, userId string) (*model.Wallet, error)
		Update(form *view.WalletForm) error
		UpdateAmount(walletId string, amount float64, isExpense bool) error
		List(userId string, limit int, from int) ([]*model.Wallet, error)
		DeleteById(id string, userId string) error
		CalculateDynamicBalance(wallet *model.Wallet) error
		BalanceByDate(walletId string, userId string, date int64) (float64, error)
	}
	WalletRepo struct {
		dbConn *gorm.DB
	}
)

func NewWalletRepo(dbConn *gorm.DB) *WalletRepo {
	return &WalletRepo{dbConn: dbConn}
}

func (r *WalletRepo) Create(form *view.WalletForm) (*model.Wallet, error) {
	walletModel := form.ToWalletModel()
	if result := r.dbConn.Create(walletModel); result.Error != nil || result.RowsAffected != 1 {
		return nil, errors.Errorf("failed to execute insert query: %s", result.Error)
	}
	return walletModel, nil
}

func (r *WalletRepo) GetById(id string, userId string) (*model.Wallet, error) {
	wallet := &model.Wallet{}
	if err := r.dbConn.First(&wallet, "id=? AND user_id=?", id, userId).Error; err != nil {
		return nil, errors.Errorf("failed to execute select query: %s", err)
	}
	// Sync balance
	if err := r.CalculateDynamicBalance(wallet); err != nil {
		return nil, errors.Errorf("failed to calculate wallet balance!!!")
	}
	return wallet, nil
}

func (r *WalletRepo) List(userId string, limit int, from int) ([]*model.Wallet, error) {
	var wallets []*model.Wallet
	if err := r.dbConn.Limit(limit).Offset(from).Find(&wallets, "user_id=?", userId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	// Sync balance
	for _, wallet := range wallets {
		if err := r.CalculateDynamicBalance(wallet); err != nil {
			return nil, errors.Errorf("failed to calculate wallets balance!!!")
		}
	}
	return wallets, nil
}

func (r *WalletRepo) Update(form *view.WalletForm) error {
	newWallet := form.ToWalletModel()
	newWallet.Id = form.WalletId
	if err := r.dbConn.Updates(newWallet).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}

func (r *WalletRepo) UpdateAmount(walletId string, amount float64, isExpense bool) error {
	var exp = ""
	if isExpense {
		exp = "balance - ?"
	} else {
		exp = "balance + ?"
	}
	//if err := r.dbConn.Model(&wallet).Update("balance", newAmount).Error; err != nil {
	//	return errors.Errorf("failed to execute update query: %s", err)
	//}
	if err := r.dbConn.Model(&model.Wallet{}).Where("id = ?", walletId).Update("balance", gorm.Expr(exp, amount)).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}

func (r *WalletRepo) DeleteById(id string, userId string) error {
	var wallet model.Wallet
	wallet.Id = id
	wallet.UserId = userId
	err := r.dbConn.Delete(wallet).RowsAffected
	if err == 0 {
		return errors.Errorf("failed to execute delete query, the inputed id may wrong: %s", id)
	}
	return nil
}

func (r *WalletRepo) CalculateDynamicBalance(wallet *model.Wallet) error {
	var newBalance float64
	// Find all past transactions of this wallet
	var transactions []*model.Transaction
	tx := r.dbConn.Where("wallet_id = ?", wallet.Id)
	tx.Where("transaction_date <= ?", time.Now())
	if err := tx.Find(&transactions).Error; err != nil {
		return fmt.Errorf("failed to execute select query: %s", err)
	}
	// Loop through all transaction, find category and calculate new balance
	for _, transaction := range transactions {
		if transaction.Note == "Initialize Wallet" {
			newBalance += transaction.Amount
		} else {
			category := &model.Category{}
			if err := r.dbConn.First(&category, "id=? AND (owner_id=? OR owner_id=?)", transaction.CatId, transaction.UserId, util.NilId).Error; err != nil {
				return errors.Errorf("failed to execute select query: %s", err)
			}
			if category.IsExpense {
				newBalance -= transaction.Amount
			} else {
				newBalance += transaction.Amount
			}
		}
	}
	// Sync new balance
	wallet.Balance = newBalance
	if err := r.dbConn.Save(wallet).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}

func (r *WalletRepo) BalanceByDate(walletId string, userId string, date int64) (float64, error) {
	var balance float64
	// Find all past transactions of this wallet till input date
	var transactions []*model.Transaction
	tx := r.dbConn.Where("wallet_id = ?", walletId)
	tx.Where("transaction_date <= ?", time.Unix(0, util.NormalizeTimeAsMilliseconds(date)*int64(time.Millisecond)))
	if err := tx.Find(&transactions).Error; err != nil {
		return 0, fmt.Errorf("failed to execute select query: %s", err)
	}
	// Loop through all transaction, find category and calculate the balance up till then
	for _, transaction := range transactions {
		if transaction.Note == "Initialize Wallet" {
			balance += transaction.Amount
		} else {
			category := &model.Category{}
			if err := r.dbConn.First(&category, "id=? AND (owner_id=? OR owner_id=?)", transaction.CatId, transaction.UserId, util.NilId).Error; err != nil {
				return 0, errors.Errorf("failed to execute select query: %s", err)
			}
			if category.IsExpense {
				balance -= transaction.Amount
			} else {
				balance += transaction.Amount
			}
		}
	}
	return balance, nil
}
