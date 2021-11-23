package repository

import (
	"gorm.io/gorm"
	"money-core/model"
)

type (
	BudgetRepoInterface interface {
		GetById(userId string, id string) (*model.Budget, error)
		GetList(userId string) ([]*model.Budget, error)
		DeleteById(userId string, id string) error
	}
	BudgetRepo struct {
		dbConn *gorm.DB
	}
)

func NewBudgetRepo(dbConn *gorm.DB) *BudgetRepo {
	return &BudgetRepo{dbConn: dbConn}
}

func (b BudgetRepo) GetById(userId string, id string) (*model.Budget, error) {
	panic("implement me")
}

func (b BudgetRepo) GetList(userId string) ([]*model.Budget, error) {
	panic("implement me")
}

func (b BudgetRepo) DeleteById(userId string, id string) error {
	panic("implement me")
}

