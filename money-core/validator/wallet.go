package validator

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

var (
	supportWalletType = map[int]struct{}{
		1: {},
	}
	supportCurrency = map[string]struct{}{
		"VND": {},
		"USD": {},
	}
)

type (
	WalletValidatorInterface interface {
		ValidateWalletForm(form *view.WalletForm) error
	}
	WalletValidator struct {
		repo *repository.Repositories
	}
)

func NewWalletValidator(repo *repository.Repositories) *WalletValidator {
	return &WalletValidator{repo: repo}
}

func (v *WalletValidator) ValidateWalletForm(form *view.WalletForm) error {
	if _, ok := supportWalletType[form.WalletType]; !ok {
		return errors.Errorf("unsupported wallet type %v", form.WalletType)
	}
	if _, ok := supportCurrency[form.WalletCurrency]; !ok {
		return errors.Errorf("unsupported wallet currency %v", form.WalletType)
	}
	if form.WalletBalance < 0 {
		return errors.New("wallet balance need to be larger than 0!")
	}
	return nil
}
