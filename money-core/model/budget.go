package model

import "time"

type Budget struct {
	Id        string    `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	UserId    string    `json:"user_id"`
	WalletId  string    `json:"wallet_id"`
	CatId     string    `json:"cat_id"`
	Amount    float64   `json:"amount"`
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	Status    int       `json:"status"`
}
