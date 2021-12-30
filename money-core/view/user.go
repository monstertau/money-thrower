package view

type (
	UpdatePasswordForm struct {
		Password string `json:"string" binding:"required" example:"12345678"`
		UserId   string `json:"user_id,omitempty" swaggerignore:"true"`
	}
)
