package connector

import (
	"database/sql"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"money-core/config"
)

const DataSourceNameFormat = "host=%s user=%s password=%s dbname=%s port=%d sslmode=disable"

func GetDBConn(config *config.DatabaseConfig) (*gorm.DB, error) {
	// initialize db connection
	connUrl := fmt.Sprintf(DataSourceNameFormat, config.Addr, config.User, config.Password, config.DBName, config.Port)
	conn, err := sql.Open("postgres", connUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to open Postgres connection: %s", err)
	}
	// initialize ORM wrapper
	dbConn, err := gorm.Open(postgres.New(postgres.Config{
		Conn: conn,
	}), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to create an ORM wrapper: %s", err)
	}
	return dbConn, nil
}
