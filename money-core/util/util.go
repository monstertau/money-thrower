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

// NormalizeTimeAsNs converts UTC time (seconds, milliseconds, nanoseconds) into nano seconds
func NormalizeTimeAsNs(timestamp int64) int64 {
	if timestamp > 1999999999999999 { // Nanoseconds
		return timestamp
	}
	if timestamp > 1999999999999 { // Microseconds
		return timestamp * int64(time.Microsecond)
	}
	if timestamp > 1999999999 { // Milliseconds
		return timestamp * int64(time.Millisecond)
	}
	return timestamp * int64(time.Second) // Seconds
}

// NormalizeTimeAsSeconds converts UTC time (seconds, milliseconds, nanoseconds) into seconds
func NormalizeTimeAsSeconds(timestamp int64) int64 {
	if timestamp > 1999999999999999 { // Nanoseconds
		return timestamp / int64(1000000000)
	}
	if timestamp > 1999999999999 { // Microseconds
		return timestamp / int64(1000000)
	}
	if timestamp > 1999999999 { // Milliseconds
		return timestamp / int64(1000)
	}
	return timestamp // Seconds
}

// NormalizeTimeAsMilliseconds converts UTC time (seconds, milliseconds, nanoseconds) into milliseconds
func NormalizeTimeAsMilliseconds(timestamp int64) int64 {
	if timestamp > 1999999999999999 { // Nanoseconds
		return timestamp / int64(1000000)
	}
	if timestamp > 1999999999999 { // Microseconds
		return timestamp / int64(1000)
	}
	if timestamp > 1999999999 { // Milliseconds
		return timestamp
	}
	return timestamp * int64(1000) // Seconds
}
