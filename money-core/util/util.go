package util

import (
	"golang.org/x/crypto/bcrypt"
	"html"
	"math/rand"
	"strings"
	"time"
)

func Hash(data string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(data), 14)
	return string(bytes), err
}

func Santize(data string) string {
	data = html.EscapeString(strings.TrimSpace(data))
	return data
}

func GenerateRecoveryToken() string {
	rand.Seed(time.Now().UnixNano())
	return randSeq(64)
}
func randSeq(n int) string {
	var letters = []rune("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

var NilId = "00000000-0000-0000-0000-000000000000"
