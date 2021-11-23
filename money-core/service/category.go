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
		Create(userId string, form *view.CategoryForm) (*view.CategoryForm, error)
		Update(userId string, form *view.CategoryForm) error
		DeleteById(userId string, id string) error
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
func (s *CategoryService) Create(userId string, form *view.CategoryForm) (*view.CategoryForm, error) {
	//todo: check cat name exist or not to allow action
	form.OwnerId = userId
	category, err := s.repositories.CategoryRepo.Create(form)
	if err != nil {
		return nil, errors.Errorf("error in create category: %v", err)
	}
	//TODO: after create, need to add init transaction for balance > 0
	form.CategoryId = category.Id
	return form, nil
}

func (s *CategoryService) Update(userId string, form *view.CategoryForm) error {
	//todo: check cat name exist or not to allow action
	form.OwnerId = userId
	_, err := s.repositories.CategoryRepo.GetById(form.CategoryId, userId)

	if err != nil {
		return errors.Errorf("error in find category: %v", err)
	}

	err = s.repositories.CategoryRepo.Update(form)
	if err != nil {
		return errors.Errorf("error in update category: %v", err)
	}
	//if form.OwnerId == util.NilId {
	//	return errors.Errorf("Cannot update common category!")
	//}
	//TODO: after create, need to add init transaction for balance > 0
	return nil
}
func (s *CategoryService) DeleteById(userId string, id string) error {
	err := s.repositories.CategoryRepo.DeleteById(id, userId)
	if err != nil {
		return errors.Errorf("error in delete category: %v", err)
	}
	return nil
}
