package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/validator"
	"net/http"
)

type BudgetController struct {
	services  *service.Services
	logger    *logrus.Entry
	validator *validator.Validator
}

func NewBudgetController(services *service.Services, validator *validator.Validator) *BudgetController {
	return &BudgetController{
		services:  services,
		validator: validator,
		logger:    logrus.WithField("controller", "transaction"),
	}
}

func (h *BudgetController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/budget")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.GET("/:id", h.GetById)
		group.GET("", h.GetList)
		group.DELETE("/:id", h.DeleteById)
	}
}

// GetById godoc
// @Summary Get detail information of a budget by id
// @Description Get detail information of a budget by id
// @Tags budget
// @Accept json
// @Produce json
// @Param id path string true "budget id"
// @Security JWT
// @Success 200 {object} view.BudgetForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /budget/{id} [GET]
func (h *BudgetController) GetById(c *gin.Context) {
	budgetId := c.Param("id")
	if len(budgetId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found transaction id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	budget, err := h.services.BudgetService.GetById(userId, budgetId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get budget information: %v", err))
		return
	}
	c.JSON(http.StatusOK, budget)
}

// GetList godoc
// @Summary Get list of budgets
// @Description Get list of budgets
// @Tags budget
// @Accept json
// @Produce json
// @Security JWT
// @Success 200 {object} view.BudgetForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /budget/ [GET]
func (h *BudgetController) GetList(c *gin.Context) {
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	budgets, err := h.services.BudgetService.GetList(userId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get budgets list: %v", err))
		return
	}
	c.JSON(http.StatusOK, budgets)
}

// DeleteById godoc
// @Summary Delete a budget
// @Description Delete a budget
// @Tags budget
// @Accept json
// @Produce json
// @Param id path string true "budget id"
// @Security JWT
// @Success 200 {object} string
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /budget/{id} [DELETE]
func (h *BudgetController) DeleteById(c *gin.Context) {
	budgetId := c.Param("id")
	if len(budgetId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found transaction id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	err = h.services.BudgetService.DeleteById(userId, budgetId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant delete budget: %v", err))
		return
	}
	c.JSON(http.StatusOK, "deleted")
}
