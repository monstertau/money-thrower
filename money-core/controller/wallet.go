package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/validator"
	"money-core/view"
	"net/http"
	"strconv"
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
		group.GET("", h.GetAll)
		group.GET("/:id", h.GetById)
		group.DELETE("/:id", h.DeleteById)
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

// GetAll godoc
// @Summary Get list wallet with paging
// @Description Return list of wallet
// @Tags wallet
// @Accept  json
// @Produce  json
// @Security JWT
// @Param from query int false "offset of list wallet want to specify, default 0"
// @Param limit query int false "limit of list wallet want to specify, default 10"
// @Success 200 {object} view.WalletForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /wallet [get]
func (h *WalletController) GetAll(c *gin.Context) {
	from, _ := strconv.Atoi(c.Query("from"))
	if from < 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("expect 'from' query param to be non-negative number"))
		return
	}
	limit, _ := strconv.Atoi(c.Query("limit"))
	if limit < 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("expect 'limit' query param to be non-negative number"))
		return
	}
	if limit == 0 {
		limit = 10 // Default limit
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	wallets, err := h.services.WalletService.GetAll(userId, limit, from)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get list wallets: %v", err))
		return
	}
	c.JSON(http.StatusOK, wallets)
}

// GetById godoc
// @Summary Get specific wallet by id
// @Description Return wallet detail
// @Tags wallet
// @Accept  json
// @Produce  json
// @Security JWT
// @Param id path string true "wallet id"
// @Success 200 {object} view.WalletForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /wallet/{id} [get]
func (h *WalletController) GetById(c *gin.Context) {
	walletId := c.Param("id")
	if len(walletId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found wallet id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	wallet, err := h.services.WalletService.GetById(userId, walletId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get wallet information: %v", err))
		return
	}
	c.JSON(http.StatusOK, wallet)
}

// DeleteById godoc
// @Summary Delete specific wallet by id
// @Description Return result detail
// @Tags wallet
// @Accept  json
// @Produce  json
// @Security JWT
// @Param id path string true "wallet id"
// @Success 200 {object} {walletId}
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /wallet/{id} [get]
func (h *WalletController) DeleteById(c *gin.Context) {
	walletId := c.Param("id")
	if len(walletId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found wallet id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	err = h.services.WalletService.DeleteById(userId, walletId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant delete wallet: %v", err))
		return
	}
	c.JSON(http.StatusOK, walletId)
}
