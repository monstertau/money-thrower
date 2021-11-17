package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
)

type (
	WalletServiceInterface interface {
		Create(userId string, form *view.WalletForm) (*view.WalletForm, error)
		Update(userId string, form *view.WalletForm) error
		GetById(userId string, id string) (*view.WalletForm, error)
		GetAll(userId string, limit int, from int) ([]*view.WalletForm, error)
		DeleteById(userId string, id string) error
	}
	WalletService struct {
		validator    *validator.Validator
		repositories *repository.Repositories
	}
)

func NewWalletService(validator *validator.Validator, repositories *repository.Repositories) *WalletService {
	return &WalletService{
		validator:    validator,
		repositories: repositories,
	}
}

func (s *WalletService) Create(userId string, form *view.WalletForm) (*view.WalletForm, error) {
	form.UserId = userId
	wallet, err := s.repositories.WalletRepo.Create(form)
	if err != nil {
		return nil, errors.Errorf("error in create wallet: %v", err)
	}
	//TODO: after create, need to add init transaction for balance > 0
	form.WalletId = wallet.Id
	return form, nil
}

func (s *WalletService) Update(userId string, form *view.WalletForm) error {
	form.UserId = userId
	_, err := s.repositories.WalletRepo.GetById(form.WalletId, userId)

	if err != nil {
		return errors.Errorf("error in find wallet: %v", err)
	}

	err = s.repositories.WalletRepo.Update(form)
	if err != nil {
		return errors.Errorf("error in update wallet: %v", err)
	}
	//TODO: after create, need to add init transaction for balance > 0
	return nil
}

func (s *WalletService) GetAll(userId string, limit int, from int) ([]*view.WalletForm, error) {
	walletViews := make([]*view.WalletForm, 0) //tao slice moi length  = 0 tu con tro mang kieu WalletForm
	wallets, err := s.repositories.WalletRepo.List(userId, limit, from)
	if err != nil {
		return make([]*view.WalletForm, 0), errors.Errorf("error in find wallets: %v", err)
	}
	for _, wallet := range wallets {
		walletView := view.ToWalletView(wallet)
		walletViews = append(walletViews, walletView)
	}
	return walletViews, nil
}

func (s *WalletService) GetById(userId string, id string) (*view.WalletForm, error) {
	wallet, err := s.repositories.WalletRepo.GetById(id, userId)
	if err != nil {
		return nil, errors.Errorf("error in find wallets: %v", err)
	}
	return view.ToWalletView(wallet), nil
}
func (s *WalletService) DeleteById(userId string, id string) error {
	err := s.repositories.WalletRepo.DeleteById(id, userId)
	if err != nil {
		return errors.Errorf("error in delete wallet: %v", err)
	}
	return nil
}
