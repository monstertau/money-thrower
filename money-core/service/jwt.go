package service

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"money-core/repository"
	"net/http"
	"strings"
	"time"
)

const bearerSchema = "Bearer"

type (
	JWTServiceInterface interface {
		GenerateToken(email string) (string, error)
		ValidateToken(token string) error
		AuthorizeJWT() gin.HandlerFunc
		GetUserId(c *gin.Context) (string, error)
		GetAuthorizedToken(c *gin.Context) string
	}
	JWTService struct {
		secretKey    string
		issuer       string
		repositories *repository.Repositories
	}
	authCustomClaims struct {
		Email string `json:"email"`
		jwt.StandardClaims
	}
)

func NewJWTService(secretKey string, repositories *repository.Repositories) *JWTService {
	return &JWTService{
		secretKey:    secretKey,
		issuer:       "monstertau",
		repositories: repositories,
	}
}

func (s *JWTService) GenerateToken(email string) (string, error) {
	claims := &authCustomClaims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    s.issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	//encoded string
	t, err := token.SignedString([]byte(s.secretKey))
	if err != nil {
		return "", errors.Errorf("error sign jwt string: %v", err)
	}
	return t, nil
}

func (s *JWTService) ValidateToken(token string) error {
	// check blacklist token
	if ok := s.repositories.RedisRepo.CheckBlacklistJWT(token); ok {
		return errors.New("invalid token")
	}
	// parse token and check valid email registration
	t, err := jwt.ParseWithClaims(token, &authCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		claims, ok := token.Claims.(*authCustomClaims)
		if !ok {
			return nil, errors.New("error parsing claims")
		}
		user, err := s.repositories.UserRepo.FindByEmail(claims.Email)
		if user == nil {
			return nil, errors.New("cant find user for token")
		}
		if err != nil {
			return nil, errors.Wrap(err, "error in FindByEmail")
		}
		return []byte(s.secretKey), nil
	})
	if t == nil || !t.Valid {
		return errors.Wrap(err, "invalid token")
	}
	return nil
}

func (s *JWTService) AuthorizeJWT() gin.HandlerFunc {
	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")
		if len(authHeader) == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Require Authorization Header"})
			return
		}

		tokenString := strings.TrimSpace(authHeader[len(bearerSchema):])
		if err := s.ValidateToken(tokenString); err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": fmt.Sprintf("Error in authorized token: %v", err)})
			return
		}
	}
}

func (s *JWTService) GetUserId(c *gin.Context) (string, error) {
	tokenString := s.GetAuthorizedToken(c)
	t, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// check token signing method etc
		return []byte(s.secretKey), nil
	})
	if err != nil {
		return "", errors.Errorf("Error in authorized token: %v", err)
	}
	claims, ok := t.Claims.(jwt.MapClaims)
	if !ok || !t.Valid {
		return "", errors.Errorf("Error in authorized token: %v", err)
	}
	user, err := s.repositories.UserRepo.FindByEmail(claims["email"].(string))
	if user == nil {
		return "", errors.New("cant find user for token")
	}
	return user.Id, nil
}

func (s *JWTService) GetAuthorizedToken(c *gin.Context) string {
	authHeader := c.GetHeader("Authorization")
	tokenString := strings.TrimSpace(authHeader[len(bearerSchema):])
	return tokenString
}
