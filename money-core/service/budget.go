package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/validator"
	"money-core/view"
)

type (
	BudgetServiceInterface interface {
		GetById(userId string, id string) (*view.BudgetForm, error)
		GetList(userId string) ([]*view.BudgetForm, error)
		DeleteById(userId string, id string) error
	}
	BudgetService struct {
		validator    *validator.Validator
		repositories *repository.Repositories
	}
)

func NewBudgetService(validator *validator.Validator, repositories *repository.Repositories) *BudgetService {
	return &BudgetService{
		validator:    validator,
		repositories: repositories,
	}
}

func (s *BudgetService) GetById(userId string, id string) (*view.BudgetForm, error) {
	budget, err := s.repositories.BudgetRepo.GetById(userId, id)
	if err != nil {
		return nil, errors.Errorf("error in find budget: %v", err)
	}
	return view.ToBudgetForm(budget), nil
}

func (s *BudgetService) GetList(userId string) ([]*view.BudgetForm, error) {
	budgetForms := make([]*view.BudgetForm, 0)
	budgetModels, err := s.repositories.BudgetRepo.GetList(userId)
	if err != nil {
		return make([]*view.BudgetForm, 0), errors.Errorf("error in find budget list: %v", err)
	}
	for _, budgetModel := range budgetModels {
		budgetForm := view.ToBudgetForm(budgetModel)
		budgetForms = append(budgetForms, budgetForm)
	}
	return budgetForms, nil
}

func (s *BudgetService) DeleteById(userId string, id string) error {
	err := s.repositories.BudgetRepo.DeleteById(userId, id)
	if err != nil {
		return errors.Errorf("error in delete budget: %v", err)
	}
	return nil
}
