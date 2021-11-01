package controller

import (
	"github.com/gin-gonic/gin"
	"money-core/service"
	"net/http"
)

type DummyController struct {
	services *service.Services
}

func NewDummyController(services *service.Services) *DummyController {
	return &DummyController{services: services}
}

func (h *DummyController) MakeHandler(g *gin.RouterGroup) {
	group := g.Group("/dummy")
	group.Use(h.services.JWTService.AuthorizeJWT())
	{
		group.GET("", h.Get)
	}

}

// Get godoc
// @Summary Dummy test connection and token
// @Description Dummy test connection and token
// @Tags testing
// @Accept  json
// @Produce  json
// @Security JWT
// @Success 200 {object} object {"message": "Hello World"}
// @Router /dummy [get]
func (h *DummyController) Get(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello World"})
}
