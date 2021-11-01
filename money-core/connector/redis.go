package connector

import (
	"context"
	"github.com/go-redis/redis/v8"
	"money-core/config"
)

//type Database struct {
//	Client *redis.Client
//}

func GetRedisConn(config *config.RedisConfig) (*redis.Client, error) {
	var (
		Ctx = context.Background()
	)
	rdb := redis.NewClient(&redis.Options{
		Addr:     config.Host,
		Password: config.Password,
		DB:       config.DB,
	})
	if err := rdb.Ping(Ctx).Err(); err != nil {
		return nil, err
	}
	return rdb, nil
}
