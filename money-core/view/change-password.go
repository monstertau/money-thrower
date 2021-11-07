package view

type (
	ForgotPasswordForm struct {
		Email string `json:"email" example:"test@gmail.com"`
	}

	SubmitNewPasswordForm struct {
		Token    string `json:"token,omitempty" example:"token-string"`
		Password string `json:"password" example:"test"`
		Email    string `json:"email" example:"test@gmail.com"`
	}

	TokenValidateForm struct {
		Token string `json:"token,omitempty" example:"token-string"`
		Email string `json:"email" example:"test@gmail.com"`
	}
)
