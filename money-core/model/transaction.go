package model

import "time"

type Transaction struct {
	Id              string    `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	UserId          string    `json:"user_id"`
	WalletId        string    `json:"wallet_id"`
	CatId           string    `json:"cat_id"`
	Amount          float64   `json:"amount"`
	Note            string    `json:"note"`
	TransactionDate time.Time `json:"transaction_date"`
}
