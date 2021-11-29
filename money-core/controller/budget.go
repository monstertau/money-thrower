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
		group.POST("", h.Create)
		group.PUT("", h.Update)
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

// Create godoc
// @Summary Add a new budget
// @Description Add a new budget
// @Tags budget
// @Accept json
// @Produce json
// @Param create body view.BudgetForm true "Create budget"
// @Security JWT
// @Success 200 {object} view.BudgetForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /budget [post]
func (h *BudgetController) Create(c *gin.Context) {
	var createForm *view.BudgetForm
	if err := c.ShouldBindJSON(&createForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	created, err := h.services.BudgetService.Create(userId, createForm)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant add budget: %v", err))
		return
	}
	c.JSON(http.StatusCreated, created)
}

// Update godoc
// @Summary Edit info of a budget
// @Description Edit info of a budget
// @Tags budget
// @Accept json
// @Produce json
// @Param update body view.BudgetForm true "Update budget"
// @Security JWT
// @Success 200 {object} view.BudgetForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /budget [put]
func (h *BudgetController) Update(c *gin.Context) {
	var updateForm *view.BudgetForm
	if err := c.ShouldBindJSON(&updateForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	if err = h.services.BudgetService.Update(userId, updateForm); err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant update budget: %v", err))
		return
	}
	c.JSON(http.StatusOK, updateForm)
}
