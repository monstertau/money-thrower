package repository

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/util"
)

type (
	CategoryRepoInterface interface {
		GetById(id string, userId string) (*model.Category, error)
		List(userId string, limit int, from int) ([]*model.Category, error)
	}
	CategoryRepo struct {
		dbConn *gorm.DB
	}
)

func NewCategoryRepo(dbConn *gorm.DB) *CategoryRepo {
	return &CategoryRepo{dbConn: dbConn}
}

func (r *CategoryRepo) GetById(id string, userId string) (*model.Category, error) {
	category := &model.Category{}
	if err := r.dbConn.First(&category, "id=? AND (owner_id=? OR owner_id=?)", id, userId, util.NilId).Error; err != nil {
		return nil, errors.Errorf("failed to execute select query: %s", err)
	}
	return category, nil
}

func (r *CategoryRepo) List(userId string, limit int, from int) ([]*model.Category, error) {
	var categories []*model.Category
	if err := r.dbConn.Limit(limit).Offset(from).Find(&categories, "owner_id=? OR owner_id=?", userId, util.NilId).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return categories, nil
}
