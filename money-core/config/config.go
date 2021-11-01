package config

import (
	"fmt"
	"github.com/spf13/viper"
)

type (
	AppConfig struct {
		ServerConfig *ServerConfig   `json:"service" mapstructure:"service"`
		DBConfig     *DatabaseConfig `json:"db" mapstructure:"db"`
		JWTConfig    *JWTConfig      `json:"jwt" mapstructure:"jwt"`
		SwagConfig   *SwaggerConfig  `json:"swagger" mapstructure:"swagger"`
		RedisConfig  *RedisConfig    `json:"redis" mapstructure:"redis"'`
		MailConfig   *MailConfig     `json:"mail" mapstructure:"mail"`
	}
	ServerConfig struct {
		Host string `json:"host" mapstructure:"host"`
		Port int    `json:"port" mapstructure:"port"`
	}
	DatabaseConfig struct {
		Addr     string `json:"addr" mapstructure:"addr"`
		Port     int    `json:"port" mapstructure:"port"`
		User     string `json:"user" mapstructure:"user"`
		Password string `json:"password" mapstructure:"password"`
		DBName   string `json:"db_name" mapstructure:"db_name"`
	}
	JWTConfig struct {
		SecretKey string `json:"secret_key" mapstructure:"secret_key"`
	}
	SwaggerConfig struct {
		Host    string   `json:"host" mapstructure:"host"`
		Schemes []string `json:"schemes" mapstructure:"schemes"`
	}
	RedisConfig struct {
		Host     string
		Password string
		DB       int
	}
	MailConfig struct {
		Email    string
		Password string
		Smtphost string
		Smtpport int
		Timeout  int
		Link     string
	}
)

const (
	DefaultConfigFilePath = "config.yaml"
)

var GlobalConfig *AppConfig

func NewAppConfig(configFilePath string) (*AppConfig, error) {
	v := viper.New()
	v.AddConfigPath(".")
	v.SetConfigType("yaml")
	v.SetConfigName(configFilePath)
	if err := v.ReadInConfig(); err != nil {
		return nil, err
	}
	fmt.Println(v.GetString("service.host"))
	appConfig := DefaultConfig()
	if err := v.Unmarshal(appConfig); err != nil {
		return nil, err
	}
	return appConfig, nil
}

func DefaultConfig() *AppConfig {
	return &AppConfig{
		ServerConfig: DefaultServerConfig(),
		DBConfig:     DefaultDBConfig(),
		JWTConfig:    DefaultJWTConfig(),
		SwagConfig:   DefaultSwagConfig(),
	}
}

func DefaultServerConfig() *ServerConfig {
	return &ServerConfig{
		Host: "0.0.0.0",
		Port: 8080,
	}
}

func DefaultDBConfig() *DatabaseConfig {
	return &DatabaseConfig{
		Addr:     "localhost",
		Port:     5432,
		User:     "monstertau",
		Password: "098poiA#",
		DBName:   "money_thrower",
	}
}

func DefaultJWTConfig() *JWTConfig {
	return &JWTConfig{
		SecretKey: "monstertau",
	}
}

func DefaultSwagConfig() *SwaggerConfig {
	return &SwaggerConfig{
		Host:    "localhost:8080",
		Schemes: []string{"http"},
	}
}

func (config *AppConfig) GetServerAddr() string {
	return fmt.Sprintf("%s:%d", config.ServerConfig.Host, config.ServerConfig.Port)
}
