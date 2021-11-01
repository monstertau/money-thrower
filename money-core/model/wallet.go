package model

type Wallet struct {
	Id         string  `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	UserId     string  `json:"user_id"`
	WalletName string  `json:"wallet_name"`
	Type       int     `json:"type"`
	Currency   string  `json:"currency"`
	Balance    float64 `json:"balance"`
	Icon       string  `json:"icon"`
}
