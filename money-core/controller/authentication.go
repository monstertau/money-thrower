package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/validator"
	"money-core/view"
	"net/http"
)

type AuthController struct {
	services   *service.Services
	validators *validator.Validator
	logger     *logrus.Entry
}

func NewAuthController(services *service.Services, validators *validator.Validator) *AuthController {
	return &AuthController{
		services:   services,
		validators: validators,
		logger:     logrus.WithField("controller", "auth"),
	}
}

func (h *AuthController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/auth")
	group.POST("/login", h.Login)
	group.POST("/register", h.Register)
	group.POST("/logout", h.services.JWTService.AuthorizeJWT(), h.Logout)
}

// Login godoc
// @Summary Login with email and password
// @Description Login with email and password
// @Tags authentication
// @Accept json
// @Produce json
// @Param login body view.LoginForm true "Login with account"
// @Success 200 {object} view.LoginForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /auth/login [post]
func (h *AuthController) Login(c *gin.Context) {
	var loginForm *view.LoginForm
	if err := c.ShouldBindJSON(&loginForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validators.AuthValidator.ValidateLoginForm(loginForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid login form: %v", err))
		return
	}
	token, err := h.services.JWTService.GenerateToken(loginForm.Email)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant generate token: %v", err))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

// Register godoc
// @Summary Register with email and password
// @Description Register with email and password
// @Tags authentication
// @Accept json
// @Produce json
// @Param register body view.LoginForm true "Register with account"
// @Success 200 {object} view.RegisterForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /auth/register [post]
func (h *AuthController) Register(c *gin.Context) {
	var registerForm *view.RegisterForm
	if err := c.ShouldBindJSON(&registerForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validators.AuthValidator.ValidateRegisterForm(registerForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid login form: %v", err))
		return
	}
	if err := h.services.AuthService.Register(registerForm); err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant register: %v", err))
		return
	}
	token, err := h.services.JWTService.GenerateToken(registerForm.Email)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant generate token: %v", err))
		return
	}
	registerForm.Token = token
	c.JSON(http.StatusCreated, registerForm)
}

// Logout godoc
// @Summary Logout and push JWT Token into blacklist for 72 hours
// @Description Logout and push JWT Token into blacklist for 72 hours
// @Tags authentication
// @Security JWT
// @Accept json
// @Produce json
// @Success 200
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /auth/logout [post]
func (h *AuthController) Logout(c *gin.Context) {
	_, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	tokenString := h.services.JWTService.GetAuthorizedToken(c)
	if err := h.services.AuthService.Logout(tokenString); err != nil {
		h.logger.Infof("Cant blacklist token: %v", err)
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("Cant logout. Something Wrong."))
		return
	}
	c.Status(http.StatusOK)
}
