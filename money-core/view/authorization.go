package view

import "money-core/model"

type (
	LoginForm struct {
		Email    string `json:"email" example:"dungsieuvip2012@gmail.com"`
		Password string `json:"password" example:"12345678"`
	}
	RegisterForm struct {
		Id       string `json:"id" example:"id"`
		Email    string `json:"email" example:"test@gmail.com"`
		Password string `json:"password" example:"test"`
		Token    string `json:"token,omitempty" example:"token-string"`
	}
)

func (f *RegisterForm) ToUserModel() *model.User {
	return &model.User{
		Email:    f.Email,
		Password: f.Password,
	}
}
