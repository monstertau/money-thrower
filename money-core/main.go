package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/swaggo/files" // swagger embed files
	"github.com/swaggo/gin-swagger"
	"log"
	"money-core/config"
	"money-core/connector"
	"money-core/controller"
	"money-core/docs"
	"money-core/repository"
	"money-core/service"
	"money-core/validator"
)

//CORSMiddleware ...
//CORS (Cross-Origin Resource Sharing)
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, x-access-token")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}

// @title Money Thrower Core API
// @description This is API Documentation of Money Thrower Core
// @securityDefinitions.apikey JWT
// @in header
// @name Authorization
// @version 1.0
// @host api.moneythrower.site
// @Schemes https
// @BasePath /api/v1
// @contact.name Trung Dung Vu
// @contact.email trungdungvu172@gmail.com
func main() {
	// init config for application
	appConfig, err := config.NewAppConfig(config.DefaultConfigFilePath)
	if err != nil {
		log.Fatalf("failed to parse configuration file %s: %v", config.DefaultConfigFilePath, err)
	}
	config.GlobalConfig = appConfig
	outConf, _ := json.Marshal(appConfig)
	fmt.Printf("===============================\n")
	fmt.Printf("Use the following configuration: \n")
	fmt.Printf("%s\n", outConf)

	//init db connection
	dbConn, err := connector.GetDBConn(appConfig.DBConfig)
	if err != nil {
		log.Fatalf("failed to connect to postgres db: %v", err)
	}
	//init redis connection
	redisConn, err := connector.GetRedisConn(appConfig.RedisConfig)
	if err != nil {
		log.Fatalf("failed to connect to redis : %v", err)
	}

	//init repositories
	repo := &repository.Repositories{
		UserRepo:        repository.NewUserRepo(dbConn),
		WalletRepo:      repository.NewWalletRepo(dbConn),
		RedisRepo:       repository.NewRedisRepo(redisConn, appConfig.MailConfig.Timeout),
		TransactionRepo: repository.NewTransactionRepo(dbConn),
		CategoryRepo:    repository.NewCategoryRepo(dbConn),
		BudgetRepo:      repository.NewBudgetRepo(dbConn),
	}

	// init validator
	validators := &validator.Validator{
		AuthValidator:           validator.NewAuthValidator(repo),
		ForgotPasswordValidator: validator.NewForgotPasswordValidator(repo),
		WalletValidator:         validator.NewWalletValidator(repo),
		TransactionValidator:    validator.NewTransactionValidator(repo),
	}

	// init services
	serv := &service.Services{
		AuthService:        service.NewAuthenticationService(repo),
		JWTService:         service.NewJWTService(appConfig.JWTConfig.SecretKey, repo),
		PasswordService:    service.NewPasswordService(repo),
		MailService:        service.NewMailService(appConfig.MailConfig),
		WalletService:      service.NewWalletService(validators, repo),
		TransactionService: service.NewTransactionService(validators, repo),
		CategoryService:    service.NewCategoryService(repo),
		BudgetService:      service.NewBudgetService(validators, repo),
	}

	route := gin.Default()
	route.Use(CORSMiddleware())
	v1 := route.Group("/api/v1")
	// check up or down
	route.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	// init controller
	authController := controller.NewAuthController(serv, validators)
	forgotPasswordController := controller.NewPasswordController(serv, validators)
	dummyController := controller.NewDummyController(serv)
	walletController := controller.NewWalletController(serv, validators)
	transactionController := controller.NewTransactionController(serv, validators)
	categoryController := controller.NewCategoryController(serv)
	budgetController := controller.NewBudgetController(serv, validators)
	authController.MakeHandler(v1)
	dummyController.MakeHandler(v1)
	walletController.MakeHandler(v1)
	forgotPasswordController.MakeHandler(v1)
	transactionController.MakeHandler(v1)
	categoryController.MakeHandler(v1)
	budgetController.MakeHandler(v1)

	docs.SwaggerInfo.Host = appConfig.SwagConfig.Host
	docs.SwaggerInfo.Schemes = appConfig.SwagConfig.Schemes
	route.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	if err := route.Run(appConfig.GetServerAddr()); err != nil {
		log.Fatalf("error starting the service: %v", err)
	}
}
