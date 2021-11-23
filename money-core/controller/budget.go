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

func (h *BudgetController) GetById(c *gin.Context) {
	_, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
}

func (h *BudgetController) GetList(c *gin.Context) {
	_, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
}

func (h *BudgetController) DeleteById(c *gin.Context) {
	_, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
}
