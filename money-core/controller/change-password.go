package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/util"
	"money-core/validator"
	"money-core/view"
	"net/http"
)

type PasswordController struct {
	services   *service.Services
	validators *validator.Validator
	logger     *logrus.Entry
}

func NewPasswordController(services *service.Services, validators *validator.Validator) *PasswordController {
	return &PasswordController{
		services:   services,
		validators: validators,
		logger:     logrus.WithField("controller", "password"),
	}
}

func (h *PasswordController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/password")
	group.POST("/forgot", h.ForgotPassword)
	group.POST("/change", h.ChangePassword)
	group.POST("/validate", h.ValidateToken)
}

// ForgotPassword godoc
// @Summary Submit email for sending reset password email
// @Description Submit email for sending reset password email
// @Tags password management
// @Accept json
// @Produce json
// @Param ForgotPassword body view.ForgotPasswordForm true "Submit email for reset password (Must be valid email)"
// @Success 200 {string} {"message": true}
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /password/forgot [post]
func (h *PasswordController) ForgotPassword(c *gin.Context) {
	var fpForm *view.ForgotPasswordForm
	if err := c.ShouldBindJSON(&fpForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validators.ForgotPasswordValidator.ValidateForgotPasswordForm(fpForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid forgot password form: %v", err))
		return
	}
	// Check key in redis
	if err := h.services.PasswordService.CheckSentMail(fpForm.Email); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprint(err))
		return
	}

	var token = util.GenerateRecoveryToken()
	// if ok send mail
	if err := h.services.MailService.SendMail(fpForm.Email, token); err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprint(err))
		return
	}

	// then add to redis
	if err := h.services.PasswordService.ForgotPassword(fpForm.Email, token); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprint(err))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": fmt.Sprintf("Email sent to %s", fpForm.Email),
	})
}

// ChangePassword godoc
// @Summary Submit token, new password, email to reset password
// @Description Submit token, new password, email to reset password. Token and
//email param receive from redirect link in mail. (E.g: http://localhost:8080/api/v1/changepass/submit?token=WBIQdjryLuSAfGgoir1kZvShlgY3hLSBubv92xkf1DqPA3167ttBrLShYTtd77cK&email=nxhoang99@gmail.com)
// @Tags password management
// @Accept json
// @Produce json
// @Param ForgotPassword body view.SubmitNewPasswordForm true "Submit token, new password, email to reset password"
// @Success 200 {string} {"message": true}
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /password/change [post]
func (h *PasswordController) ChangePassword(c *gin.Context) {
	var snpForm *view.SubmitNewPasswordForm
	if err := c.ShouldBindJSON(&snpForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	//validate form
	if err := h.validators.AuthValidator.ValidatePassword(snpForm.Password); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid form: %v", err))
		return
	}
	// Reset password
	if err := h.services.PasswordService.ResetPassword(snpForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("error in reset password: %v", err))
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Change password successfully",
	})

}

// ValidateToken godoc
// @Summary Validate Token before display change password form
// @Description Validate Token before display change password form
// @Tags password management
// @Accept json
// @Produce json
// @Param ForgotPassword body view.TokenValidateForm true "Submit token, email to reset password"
// @Success 200 {string} {"message": true}
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /password/validate [post]
func (h *PasswordController) ValidateToken(c *gin.Context) {
	var vForm *view.TokenValidateForm
	if err := c.ShouldBindJSON(&vForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}

	if err := h.services.PasswordService.ValidateToken(vForm.Token, vForm.Email); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid form: %v", err))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "ok",
	})
}
