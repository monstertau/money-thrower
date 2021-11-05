package validator

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	TransactionValidatorInterface interface {
		ValidateFilterForm(form *view.FilterTransactionForm) error
		ValidateAddForm(form *view.TransactionForm) error
	}
	TransactionValidator struct {
		repo *repository.Repositories
	}
)

func NewTransactionValidator(repo *repository.Repositories) *TransactionValidator {
	return &TransactionValidator{repo: repo}
}

func (v *TransactionValidator) ValidateFilterForm(form *view.FilterTransactionForm) error {
	// TODO
	return nil
}

func (v *TransactionValidator) ValidateAddForm(form *view.TransactionForm) error {
	// amount validate
	if form.Amount <= 0 {
		return errors.Errorf("Amount of money must be > 0")
	}

	// wallet_id validate
	wallet, err := v.repo.WalletRepo.GetById(form.WalletId)
	if err != nil || wallet.UserId != form.UserId {
		return errors.Errorf("Invalid wallet_id")
	}

	// cat_id validate
	cate, err := v.repo.CategoryRepo.GetById(form.CatId)
	if err != nil || cate == nil ||
		(cate.OwnerId != form.UserId && cate.OwnerId != "00000000-0000-0000-0000-000000000000") {
		return errors.Errorf("Invalid cat_id")
	}

	// transfer money
	if err := v.repo.WalletRepo.UpdateAmount(wallet, form.Amount, cate.IsExpense); err != nil {
		return errors.Errorf("Failed when updating wallet")
	}

	return nil
}
