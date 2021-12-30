package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/model"
	"money-core/service"
	"money-core/validator"
	"money-core/view"
	"net/http"
)

type UserController struct {
	services  *service.Services
	logger    *logrus.Entry
	validator *validator.Validator
}

func NewUserController(services *service.Services, validator *validator.Validator) *UserController {
	return &UserController{
		services:  services,
		validator: validator,
		logger:    logrus.WithField("controller", "user"),
	}
}

func (h *UserController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/user")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.GET("/", h.GetById)
		group.PUT("/update-password", h.UpdatePassword)
	}
}

// GetById godoc
// @Summary Get User Info
// @Description Get User Info
// @Tags User
// @Accept json
// @Produce json
// @Security JWT
// @Success 200 {object} model.User
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /user/ [GET]
func (h *UserController) GetById(c *gin.Context) {
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Error when get current user"))
		return
	}
	user, err := h.services.UserService.GetById(userId)

	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Server error"))
		return
	}
	var responseUser = model.User{Email: user.Email, Id: user.Id, CreatedTime: user.CreatedTime, UpdatedTime: user.UpdatedTime}
	c.JSON(http.StatusOK, responseUser)
}

// UpdatePassword godoc
// @Summary Update Password User
// @Description Update Password User
// @Tags User
// @Accept json
// @Produce json
// @Param create body view.UpdatePasswordForm true "Update password"
// @Security JWT
// @Success 200 {object} string
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /user/update-password [PUT]
func (h *UserController) UpdatePassword(c *gin.Context) {
	var form *view.UpdatePasswordForm
	if err := c.ShouldBindJSON(&form); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Error when get current user"))
		return
	}

	if err := h.services.UserService.UpdatePassword(userId, form.Password); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Cannot update password"))
		return
	}
	c.JSON(http.StatusOK, "ok")
}
