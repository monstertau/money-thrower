package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"money-core/service"
	"money-core/validator"
	"net/http"
	"strconv"
)

type CategoryController struct {
	services  *service.Services
	logger    *logrus.Entry
	validator *validator.Validator
}

func NewCategoryController(services *service.Services) *CategoryController {
	return &CategoryController{
		services: services,
		logger:   logrus.WithField("controller", "category"),
	}
}

func (h *CategoryController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/category")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.GET("", h.GetAll)
		group.GET("/:id", h.GetById)
	}
}

// GetAll godoc
// @Summary Get list category with paging
// @Description Return list of category
// @Tags category
// @Accept  json
// @Produce  json
// @Security JWT
// @Param from query int false "offset of list category want to specify, default 0"
// @Param limit query int false "limit of list category want to specify, default 10"
// @Success 200 {object} view.CategoryForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /category [get]
func (h *CategoryController) GetAll(c *gin.Context) {
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
	categorys, err := h.services.CategoryService.GetAll(userId, limit, from)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get list categorys: %v", err))
		return
	}
	c.JSON(http.StatusOK, categorys)
}

// GetById godoc
// @Summary Get specific category by id
// @Description Return category detail
// @Tags category
// @Accept  json
// @Produce  json
// @Security JWT
// @Param id path string true "category id"
// @Success 200 {object} view.CategoryForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /category/{id} [get]
func (h *CategoryController) GetById(c *gin.Context) {
	categoryId := c.Param("id")
	if len(categoryId) == 0 {
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("cant found category id in request"))
		return
	}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	category, err := h.services.CategoryService.GetById(userId, categoryId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get category information: %v", err))
		return
	}
	c.JSON(http.StatusOK, category)
}
