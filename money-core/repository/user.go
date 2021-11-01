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
	UserRepoInterface interface {
		Create(form *view.RegisterForm) (*model.User, error)
		FindByEmail(email string) (*model.User, error)
		Find(form *view.LoginForm) (*model.User, error)
		UpdatePassword(email string, password string) error
	}
	UserRepo struct {
		dbConn *gorm.DB
	}
)

func NewUserRepo(dbConn *gorm.DB) *UserRepo {
	return &UserRepo{dbConn: dbConn}
}
func (r *UserRepo) Create(form *view.RegisterForm) (*model.User, error) {
	pass, err := util.Hash(form.Password)
	if err != nil {
		return nil, errors.New("cant hash password")
	}
	form.Password = pass
	userModel := form.ToUserModel()
	if result := r.dbConn.Create(userModel); result.Error != nil || result.RowsAffected != 1 {
		return nil, fmt.Errorf("failed to execute insert query: %s", result.Error)
	}
	return userModel, nil
}

func (r *UserRepo) FindByEmail(email string) (*model.User, error) {
	var user *model.User
	if err := r.dbConn.First(&user, "email=?", email).Error; err != nil {
		return nil, fmt.Errorf("failed to execute select query: %s", err)
	}
	return user, nil
}

func (r *UserRepo) Find(form *view.LoginForm) (*model.User, error) {
	return nil, nil
}

func (r *UserRepo) UpdatePassword(email string, password string) error {
	pass, err := util.Hash(password)
	if err != nil {
		fmt.Println("cant hash password")
		return errors.New("Hash error")
	}
	var user *model.User
	r.dbConn.First(&user, "email=?", email).Update("password", pass)
	if err != nil {
		return errors.New("Can not find email associated with")
	}
	return nil
}
