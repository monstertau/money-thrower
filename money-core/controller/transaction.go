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
		group.GET("/:id", h.GetById)
		group.DELETE("/:id", h.DeleteById)
		group.POST("", h.GetFilteredList)
	}
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
// @Param limit query int false "limit of list transactions want to specify, default 10"
// @Param offset query int false "offset of list transactions want to specify, default 0"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction [POST]
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
	offset, _ := strconv.Atoi(c.Query("offset"))
	if offset < 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("expect 'offset' query param to be non-negative number"))
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
	transactions, err := h.services.TransactionService.GetFilteredList(userId, limit, offset, filterForm)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get filtered list transactions: %v", err))
		return
	}
	c.JSON(http.StatusOK, transactions)
}
