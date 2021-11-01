package controller

import "github.com/gin-gonic/gin"

type AppError struct {
	Args    []string `json:"args" example:"null"`
	Message string   `json:"message" example:"invalid form"`
	Code    int      `json:"code" example:"400"`
}

func ResponseError(code int, message string, args ...string) AppError {
	return AppError{Code: code, Message: message, Args: args}
}

func ReportError(c *gin.Context, statusCode int, errMsg string) {
	c.AbortWithStatusJSON(statusCode, ResponseError(statusCode, errMsg))
}

func ReportErrorWithArgs(c *gin.Context, statusCode int, errMsg string, args ...string) {
	c.AbortWithStatusJSON(statusCode, ResponseError(statusCode, errMsg, args...))
}
