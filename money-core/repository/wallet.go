package repository

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/view"
)

type (
	WalletRepoInterface interface {
		Create(form *view.WalletForm) (*model.Wallet, error)
		GetById(id string) (*model.Wallet, error)
		Update(form *view.WalletForm) error
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

func (r *WalletRepo) GetById(id string) (*model.Wallet, error) {
	wallet := &model.Wallet{}
	if err := r.dbConn.First(&wallet, "id=?", id).Error; err != nil {
		return nil, errors.Errorf("failed to execute select query: %s", err)
	}
	return wallet, nil
}

func (r *WalletRepo) Update(form *view.WalletForm) error {
	newWallet := form.ToWalletModel()
	newWallet.Id = form.WalletId
	if err := r.dbConn.Updates(newWallet).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}
