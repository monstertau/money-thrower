package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/validator"
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
		group.GET("", h.GetById)
		group.PUT("", h.DeleteById)
		group.GET("", h.GetList)
		group.GET("", h.GetFilteredList)
	}
}

// GetById godoc
// @Summary Get detail information of a transaction
// @Description Get detail information of a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param id
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/detail [GET]
func (h *TransactionController) GetById(c *gin.Context) {
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}

// DeleteById godoc
// @Summary Delete a transaction
// @Description Delete a transaction
// @Tags transaction
// @Accept json
// @Produce json
// @Param id
// @Security JWT
// @Success 200 {object} string
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/delete [PUT]
func (h *TransactionController) DeleteById(c *gin.Context) {
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}

// GetList godoc
// @Summary Get list of transactions based on filter
// @Description Get list of transactions based on filter
// @Tags transaction
// @Accept json
// @Produce json
// @Param id
// @Param limit query int false "limit of list wallet want to specify, default 10"
// @Param offset query int false "offset of list wallet want to specify, default 0"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/filter [GET]
func (h *TransactionController) GetList(c *gin.Context) {
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}

// GetFilteredList godoc
// @Summary Get list of transactions based on filter
// @Description Get list of transactions based on filter
// @Tags transaction
// @Accept json
// @Produce json
// @Param create body view.FilterTransactionForm true "Get transaction list"
// @Param limit query int false "limit of list wallet want to specify, default 10"
// @Param offset query int false "offset of list wallet want to specify, default 0"
// @Security JWT
// @Success 200 {object} view.TransactionForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /transaction/filter [GET]
func (h *TransactionController) GetFilteredList(c *gin.Context) {
	// userId, err := h.services.JWTService.GetUserId(c)
	// TODO
}
