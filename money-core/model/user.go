package model

import "time"

type User struct {
	Id          string    `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Email       string    `json:"email"`
	Password    string    `json:"password,omitempty"`
	CreatedTime time.Time `json:"created_time" gorm:"->"`
	UpdatedTime time.Time `json:"updated_time" gorm:"->"`
}
