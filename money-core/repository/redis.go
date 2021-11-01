package repository

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/pkg/errors"
	"time"
)

type (
	RedisRepositoryInterface interface {
		SetForgotToken(email string, token string) error
		GetForgotTokenFromMail(email string) (string, error)
		SetBlacklistJWT(token string) error
		CheckBlacklistJWT(token string) bool
	}
	RedisRepo struct {
		rdb                *redis.Client
		forgotTokenTimeout int
	}
)

func NewRedisRepo(rdb *redis.Client, timeout int) *RedisRepo {
	return &RedisRepo{
		rdb:                rdb,
		forgotTokenTimeout: timeout, //forgotTokenTimeout between each mail for 1 user
	}
}

func (r *RedisRepo) SetForgotToken(email string, token string) error {
	ctx, cancer := context.WithTimeout(context.TODO(), 30*time.Second)
	defer cancer()
	err := r.rdb.Set(ctx, email, token, time.Duration(r.forgotTokenTimeout)*time.Second).Err()
	if err != nil {
		return err
	}
	return nil
}

func (r *RedisRepo) GetForgotTokenFromMail(email string) (string, error) {
	ctx, cancer := context.WithTimeout(context.TODO(), 30*time.Second)
	defer cancer()
	return r.rdb.Get(ctx, email).Result()
}

func (r *RedisRepo) SetBlacklistJWT(token string) error {
	ctx, cancer := context.WithTimeout(context.TODO(), 30*time.Second)
	defer cancer()
	err := r.rdb.SetEX(ctx, token, true, 72*time.Hour).Err()
	if err != nil {
		return errors.Wrap(err, "cant set blacklist jwt token")
	}
	return nil
}

func (r *RedisRepo) CheckBlacklistJWT(token string) bool {
	ctx, cancer := context.WithTimeout(context.TODO(), 30*time.Second)
	defer cancer()
	_, err := r.rdb.Get(ctx, token).Result()
	if err == redis.Nil || err != nil {
		return false
	}
	return true
}
