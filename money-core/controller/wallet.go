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

type WalletController struct {
	services  *service.Services
	logger    *logrus.Entry
	validator *validator.Validator
}

func NewWalletController(services *service.Services, validator *validator.Validator) *WalletController {
	return &WalletController{
		services:  services,
		validator: validator,
		logger:    logrus.WithField("controller", "wallet"),
	}
}

func (h *WalletController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/wallet")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.POST("", h.Create)
		group.PUT("", h.Update)
	}
}

// Create godoc
// @Summary Add a new wallet
// @Description Add a new wallet
// @Tags wallet
// @Accept json
// @Produce json
// @Param create body view.WalletForm true "Create wallet"
// @Security JWT
// @Success 200 {object} view.WalletForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /wallet [post]
func (h *WalletController) Create(c *gin.Context) {
	var createForm *view.WalletForm
	if err := c.ShouldBindJSON(&createForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validator.WalletValidator.ValidateWalletForm(createForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid add wallet form: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	created, err := h.services.WalletService.Create(userId, createForm)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant add wallet: %v", err))
		return
	}
	c.JSON(http.StatusCreated, created)
}

// Update godoc
// @Summary Edit info of a wallet
// @Description Edit info of a wallet
// @Tags wallet
// @Accept json
// @Produce json
// @Param update body view.WalletForm true "Update wallet"
// @Security JWT
// @Success 200 {object} view.WalletForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /wallet [put]
func (h *WalletController) Update(c *gin.Context) {
	var updateForm *view.WalletForm
	if err := c.ShouldBindJSON(&updateForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validator.WalletValidator.ValidateWalletForm(updateForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid update wallet form: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	if err = h.services.WalletService.Update(userId, updateForm); err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant update wallet: %v", err))
		return
	}
	c.JSON(http.StatusOK, updateForm)
}
