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
		group.POST("", h.Add)
		group.PUT("", h.Edit)
		group.GET("/:id", h.GetById)
		group.DELETE("/:id", h.DeleteById)
		group.POST("/filter", h.GetFilteredList)
	}
}

// Add godoc
// @Summary Add new transaction
// @Description Add new transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.AddTransactionForm true "Get transaction"
// @Security JWT
// @Success 200 {object} view.AddTransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/ [POST]
func (h *TransactionController) Add(c *gin.Context) {
	var form *view.AddTransactionForm
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

	isExpense, err := h.validator.TransactionValidator.ValidateAddForm(form)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Invalid when adding new transaction: %v", err))
		return
	}

	transaction, err := h.services.TransactionService.AddTransactions(form, isExpense)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Invalid when adding new transaction: %v", err))
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

// Edit Transaction godoc
// @Summary Edit a transaction
// @Description Edit a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.EditTransactionForm true "Get transaction"
// @Security JWT
// @Success 200 {object} view.EditTransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/ [PUT]
func (h *TransactionController) Edit(c *gin.Context) {
	var form *view.EditTransactionForm
	if err := c.ShouldBindJSON(&form); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusForbidden, fmt.Sprintf("Error when find user: %v", err))
		return
	}
	form.UserId = userId
	transaction, err := h.services.TransactionService.GetTransactions(userId, form)
	if err != nil {
		ReportError(c, http.StatusForbidden, fmt.Sprintf("%v", err))
		return
	}
	changeAmount, err := h.validator.TransactionValidator.ValidateEditForm(transaction, form)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Invalid when editing transaction: %v", err))
		return
	}
	if form.Note == "" {
		form.Note = transaction.Note
	}
	// Update to transaction and update wallet amount
	newTransaction, err := h.services.TransactionService.EditTransactions(form, transaction.WalletId, changeAmount)
	if err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("Error when editing transaction: %v", err))
		return
	}
	c.JSON(http.StatusOK, newTransaction)
}

// GetById godoc
// @Summary Get detail information of a transaction by id
// @Description Get detail information of a transaction by id
// @Tags transaction
// @Accept json
// @Produce json
// @Param id path string true "transaction id"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/{id} [GET]
func (h *TransactionController) GetById(c *gin.Context) {
	transactionId := c.Param("id")
	if len(transactionId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found transaction id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	transaction, err := h.services.TransactionService.GetById(userId, transactionId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get transaction information: %v", err))
		return
	}
	c.JSON(http.StatusOK, transaction)
}

// DeleteById godoc
// @Summary Delete a transaction
// @Description Delete a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param id path string true "transaction id"
// @Security JWT
// @Success 200 {object} string
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/{id} [DELETE]
func (h *TransactionController) DeleteById(c *gin.Context) {
	transactionId := c.Param("id")
	if len(transactionId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found transaction id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	err = h.services.TransactionService.DeleteById(userId, transactionId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant delete transaction: %v", err))
		return
	}
	c.JSON(http.StatusOK, "deleted")
}

// GetFilteredList godoc
// @Summary Get list of transactions based on filter
// @Description Get list of transactions based on filter
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.FilterTransactionForm true "Get filtered transaction list"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/filter [POST]
func (h *TransactionController) GetFilteredList(c *gin.Context) {
	var filterForm *view.FilterTransactionForm
	if err := c.ShouldBindJSON(&filterForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	if err := h.validator.TransactionValidator.ValidateFilterForm(filterForm); err != nil {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid filter transactions form: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	transactions, err := h.services.TransactionService.GetFilteredList(userId, filterForm)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get filtered list transactions: %v", err))
		return
	}
	c.JSON(http.StatusOK, transactions)
}
