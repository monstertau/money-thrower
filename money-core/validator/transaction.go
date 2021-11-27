package validator

import (
	"github.com/pkg/errors"
	"money-core/model"
	"money-core/repository"
	"money-core/view"
	"time"
)

type (
	TransactionValidatorInterface interface {
		ValidateFilterForm(form *view.FilterTransactionForm) error
		ValidateAddForm(form *view.AddTransactionForm) (bool, error)
		ValidateEditForm(trans *model.Transaction, form *view.EditTransactionForm) (float64, error)
	}
	TransactionValidator struct {
		repo *repository.Repositories
	}
)

func NewTransactionValidator(repo *repository.Repositories) *TransactionValidator {
	return &TransactionValidator{repo: repo}
}

func (v *TransactionValidator) ValidateFilterForm(form *view.FilterTransactionForm) error {
	if form.StartAmount > form.EndAmount || form.EndAmount < 0 {
		return errors.New("start amount should smaller than end amount")
	}
	if time.Unix(form.StartDate/1000, 0).After(time.Unix(form.EndDate/1000, 0)) {
		return errors.New("start date should before end date")
	}
	return nil
}

func (v *TransactionValidator) ValidateAddForm(form *view.AddTransactionForm) (bool, error) {
	// amount validate
	if form.Amount <= 0 {
		return false, errors.Errorf("Amount of money must be > 0")
	}

	// wallet_id validate
	wallet, err := v.repo.WalletRepo.GetById(form.WalletId, form.UserId)
	if err != nil || wallet.UserId != form.UserId {
		return false, errors.Errorf("Invalid wallet_id")
	}

	// cat_id validate
	cate, err := v.repo.CategoryRepo.GetById(form.CatId, form.UserId)
	if err != nil || cate == nil ||
		(cate.OwnerId != form.UserId && cate.OwnerId != "00000000-0000-0000-0000-000000000000") {
		return false, errors.Errorf("Invalid cat_id")
	}

	if form.TransactionDate < 0 {
		return false, errors.Errorf("Invalid transaction_date")
	}
	return cate.IsExpense, nil
}

func (v *TransactionValidator) ValidateEditForm(trans *model.Transaction, form *view.EditTransactionForm) (float64, error) {
	if trans.UserId != form.UserId {
		return -1, errors.Errorf("Not your transaction")
	}

	var changeAmount = float64(0)

	oldCate, err := v.repo.CategoryRepo.GetById(trans.CatId, form.UserId)
	if err != nil {
		return -1, errors.Errorf("Cannot validate cat_id")
	}
	var newCate = &model.Category{}
	// cat_id validate
	if form.CatId != "" {
		newCate, err = v.repo.CategoryRepo.GetById(form.CatId, form.UserId)
		if err != nil || newCate == nil ||
			(newCate.OwnerId != form.UserId && newCate.OwnerId != "00000000-0000-0000-0000-000000000000") {
			return -1, errors.Errorf("Invalid cat_id")
		}
		// Recovering money
		if oldCate.IsExpense {
			changeAmount += trans.Amount
		} else {
			changeAmount -= trans.Amount
		}
	} else {
		newCate = oldCate
	}
	// amount validate
	if form.Amount != 0 {
		if form.Amount < 0 {
			return -1, errors.Errorf("Amount of money must be > 0")
		}

		if newCate.IsExpense {
			changeAmount -= form.Amount
		} else {
			changeAmount += form.Amount
		}
	}
	return changeAmount, nil
}
