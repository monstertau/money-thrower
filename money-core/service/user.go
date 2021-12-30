package service

import (
	"fmt"
	"money-core/model"
	"money-core/repository"
)

type (
	UserServiceInterface interface {
		GetById(id string) (*model.User, error)
		UpdatePassword(id string, password string) error
	}
	UserService struct {
		repositories *repository.Repositories
	}
)

func NewUserService(repositories *repository.Repositories) *UserService {
	return &UserService{
		repositories: repositories,
	}
}

func (s *UserService) GetById(id string) (*model.User, error) {
	user, err := s.repositories.UserRepo.FindByID(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
func (s *UserService) UpdatePassword(id string, password string) error {
	user, err := s.repositories.UserRepo.FindByID(id)
	if err != nil {
		return fmt.Errorf("failed to get user : %s", err)
	}
	if err := s.repositories.UserRepo.UpdatePassword(user.Email, password); err != nil {
		return fmt.Errorf("failed to update password : %s", err)
	}
	return nil
}
