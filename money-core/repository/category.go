package repository

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
)

type (
	CategoryRepoInterface interface {
		GetById(id string) (*model.Category, error)
	}
	CategoryRepo struct {
		dbConn *gorm.DB
	}
)

func NewCategoryRepo(dbConn *gorm.DB) *CategoryRepo {
	return &CategoryRepo{dbConn: dbConn}
}

func (c *CategoryRepo) GetById(id string) (*model.Category, error) {
	category := &model.Category{}
	if err := c.dbConn.First(category, "id=?", id).Error; err != nil {
		return nil, errors.Errorf("failed to execute select query: %s", err)
	}
	return category, nil
}
