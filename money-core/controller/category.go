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
		group.POST("", h.Create)
		group.PUT("", h.Update)
		group.DELETE("/:id", h.DeleteById)
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

// Create godoc
// @Summary Add a new category
// @Description Add a new category
// @Tags category
// @Accept json
// @Produce json
// @Param create body view.CategoryForm true "Create category"
// @Security JWT
// @Success 200 {object} view.CategoryForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /category [post]
func (h *CategoryController) Create(c *gin.Context) {
	var createForm *view.CategoryForm
	if err := c.ShouldBindJSON(&createForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	//if err := h.validator.CategoryValidator.ValidateCategoryForm(createForm); err != nil {
	//	ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid add category form: %v", err))
	//	return
	//}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	created, err := h.services.CategoryService.Create(userId, createForm)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant add category: %v", err))
		return
	}
	c.JSON(http.StatusCreated, created)
}

// Update godoc
// @Summary Edit info of a category
// @Description Edit info of a category
// @Tags category
// @Accept json
// @Produce json
// @Param update body view.CategoryForm true "Update category"
// @Security JWT
// @Success 200 {object} view.CategoryForm
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /category [put]
func (h *CategoryController) Update(c *gin.Context) {
	var updateForm *view.CategoryForm
	if err := c.ShouldBindJSON(&updateForm); err != nil {
		h.logger.Infof("Invalid form: %v ", err.Error())
		ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid input in parse json format: %v", err))
		return
	}
	//if err := h.validator.CategoryValidator.ValidateCategoryForm(updateForm); err != nil {
	//	ReportError(c, http.StatusBadRequest, fmt.Sprintf("invalid update category form: %v", err))
	//	return
	//}
	userId, err := h.services.JWTService.GetUserId(c)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant get user id: %v", err))
		return
	}
	if err = h.services.CategoryService.Update(userId, updateForm); err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant update category: %v", err))
		return
	}
	c.JSON(http.StatusOK, updateForm)
}

// DeleteById godoc
// @Summary Delete specific category by id
// @Description Return result detail
// @Tags category
// @Accept  json
// @Produce  json
// @Security JWT
// @Param id path string true "category id"
// @Success 200 {object} string
// @Failure 400 {object} AppError
// @Failure 500 {object} AppError
// @Router /category/{id} [delete]
func (h *CategoryController) DeleteById(c *gin.Context) {
	//check cate co owner moi xoa duoc
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
	err = h.services.CategoryService.DeleteById(userId, categoryId)
	if err != nil {
		ReportError(c, http.StatusInternalServerError, fmt.Sprintf("cant delete category: %v", err))
		return
	}
	c.JSON(http.StatusOK, categoryId)
}
