package service

import (
	"github.com/pkg/errors"
	"money-core/repository"
	"money-core/view"
)

type (
	CategoryServiceInterface interface {
		GetById(userId string, id string) (*view.CategoryForm, error)
		GetAll(userId string, limit int, from int) ([]*view.CategoryForm, error)
	}
	CategoryService struct {
		repositories *repository.Repositories
	}
)

func NewCategoryService(repositories *repository.Repositories) *CategoryService {
	return &CategoryService{
		repositories: repositories,
	}
}

func (s *CategoryService) GetAll(userId string, limit int, from int) ([]*view.CategoryForm, error) {
	categoryViews := make([]*view.CategoryForm, 0) //tao slice moi length  = 0 tu con tro mang kieu CategoryForm
	categories, err := s.repositories.CategoryRepo.List(userId, limit, from)
	if err != nil {
		return make([]*view.CategoryForm, 0), errors.Errorf("error in find categories: %v", err)
	}
	for _, category := range categories {
		categoryView := view.ToCategoryView(category)
		categoryViews = append(categoryViews, categoryView)
	}
	return categoryViews, nil
}

func (s *CategoryService) GetById(userId string, id string) (*view.CategoryForm, error) {
	category, err := s.repositories.CategoryRepo.GetById(id, userId)
	if err != nil {
		return nil, errors.Errorf("error in find categorys: %v", err)
	}
	return view.ToCategoryView(category), nil
}
