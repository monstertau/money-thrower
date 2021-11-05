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

type TransactionController struct {
	services  *service.Services
	logger    *logrus.Entry
	validator *validator.Validator
}

func NewTransactionController(services *service.Services, validator *validator.Validator) *TransactionController {
	return &TransactionController{
		services:  services,
		validator: validator,
		logger:    logrus.WithField("controller", "transaction"),
	}
}

func (h *TransactionController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/transaction")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.POST("add", h.Add)
		group.GET("detail", h.GetDetail)
		group.PUT("delete", h.DeleteTransaction)
		group.GET("filter", h.FilterTransactionList)
	}
}

func (h *TransactionController) Add(c *gin.Context) {
	var form *view.TransactionForm
	if err := c.ShouldBindJSON(&form); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}

	userId, err := h.services.JWTService.GetUserId(c)
	form.UserId = userId
	if err != nil {
		ReportError(c, http.StatusForbidden, fmt.Sprintf("Error when find user: %v", err))
		return
	}

	if err := h.validator.TransactionValidator.ValidateAddForm(form); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Invalid when adding new transaction: %v", err))
		return
	}

	transaction, err := h.services.TransactionService.AddTransactions(form)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Invalid when adding new transaction: %v", err))
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

// GetDetail godoc
// @Summary Get detail information of a transaction
// @Description Get detail information of a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.TransactionForm true "Get transaction"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/detail [GET]
func (h *TransactionController) GetDetail(c *gin.Context) {
	var form *view.TransactionForm
	if err := c.ShouldBindJSON(&form); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}

// DeleteTransaction godoc
// @Summary Delete a transaction
// @Description Delete a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.DeleteTransactionForm true "Delete transaction"
// @Security JWT
// @Success 200 {object} view.DeleteTransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/delete [PUT]
func (h *TransactionController) DeleteTransaction(c *gin.Context) {
	var deleteForm *view.DeleteTransactionForm
	if err := c.ShouldBindJSON(&deleteForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}

// FilterTransactionList godoc
// @Summary Get list of transactions based on filter
// @Description Get list of transactions based on filter
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.FilterTransactionForm true "Get transaction list"
// @Security JWT
// @Success 200 {object} view.FilterTransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/filter [GET]
func (h *TransactionController) FilterTransactionList(c *gin.Context) {
	var filterForm *view.FilterTransactionForm
	if err := c.ShouldBindJSON(&filterForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}
