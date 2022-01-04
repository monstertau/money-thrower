package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/util"
	"money-core/validator"
	"money-core/view"
	"time"
)

type (
	BudgetServiceInterface interface {
		Create(userId string, form *view.BudgetForm) (*view.BudgetForm, error)
		Update(userId string, form *view.BudgetForm) error
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
	form := view.ToBudgetForm(budget)
	spentAmount, err := s.repositories.BudgetRepo.GetSpentAmount(budget)
	if err != nil {
		return nil, errors.Errorf("error in calculate spent amount of budget: %v", err)
	}
	form.SpentAmount = spentAmount
	return form, nil
}

func (s *BudgetService) GetList(userId string) ([]*view.BudgetForm, error) {
	budgetForms := make([]*view.BudgetForm, 0)
	budgetModels, err := s.repositories.BudgetRepo.GetList(userId)
	if err != nil {
		return make([]*view.BudgetForm, 0), errors.Errorf("error in find budget list: %v", err)
	}
	for _, budgetModel := range budgetModels {
		budgetForm := view.ToBudgetForm(budgetModel)
		spentAmount, err := s.repositories.BudgetRepo.GetSpentAmount(budgetModel)
		if err != nil {
			return nil, errors.Errorf("error in calculate spent amount of budget: %v", err)
		}
		budgetForm.SpentAmount = spentAmount
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

func (s *BudgetService) Create(userId string, form *view.BudgetForm) (*view.BudgetForm, error) {
	form.UserId = userId
	form.Status = 1
	if util.NormalizeTimeAsMilliseconds(form.EndDate) < util.NormalizeTimeAsSeconds(time.Now().Unix()) {
		form.Status = 0
	}
	Budget, err := s.repositories.BudgetRepo.Create(form)
	if err != nil {
		return nil, errors.Errorf("error in create Budget: %v", err)
	}
	form.Id = Budget.Id
	return form, nil
}

func (s *BudgetService) Update(userId string, form *view.BudgetForm) error {
	form.UserId = userId
	_, err := s.repositories.BudgetRepo.GetById(userId, form.Id)

	if err != nil {
		return errors.Errorf("error in find budget: %v", err)
	}

	err = s.repositories.BudgetRepo.Update(form)
	if err != nil {
		return errors.Errorf("error in update budget: %v", err)
	}

	return nil
}
