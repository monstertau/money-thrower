package repository

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"money-core/model"
	"money-core/util"
	"money-core/view"
)

type (
	CategoryRepoInterface interface {
		GetById(id string, userId string) (*model.Category, error)
		List(userId string, limit int, from int) ([]*model.Category, error)
		Create(form *view.CategoryForm) (*model.Category, error)
		Update(form *view.CategoryForm) error
		DeleteById(id string, userId string) error
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
func (r *CategoryRepo) Create(form *view.CategoryForm) (*model.Category, error) {
	categoryModel := form.ToCategoryModel()
	if result := r.dbConn.Create(categoryModel); result.Error != nil || result.RowsAffected != 1 {
		return nil, errors.Errorf("failed to execute insert query: %s", result.Error)
	}
	return categoryModel, nil
}
func (r *CategoryRepo) Update(form *view.CategoryForm) error {
	editCategory := form.ToCategoryModel()
	editCategory.Id = form.CategoryId
	if err := r.dbConn.Updates(editCategory).Error; err != nil {
		return errors.Errorf("failed to execute update query: %s", err)
	}
	return nil
}

func (r *CategoryRepo) DeleteById(id string, userId string) error {
	var category model.Category
	category.Id = id
	category.Id = userId
	err := r.dbConn.Delete(category).RowsAffected
	if err == 0 {
		return errors.Errorf("failed to execute delete query, the inputed id may be common category: %s", id)
	}
	return nil
}
