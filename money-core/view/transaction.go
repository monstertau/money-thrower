package view

import "time"

type (
	// TransactionIdForm Use for Get detail or Delete a transaction
	TransactionIdForm struct {
		TransactionId string `json:"transaction_id" example:""`
	}
	// FilterTransactionForm Use when filtering for list of transactions
	FilterTransactionForm struct {
		UserId      string    `json:"user_id" swaggerignore:"true"`
		WalletId    string    `json:"wallet_id" example:""`
		CatId       string    `json:"cat_id" example:""`
		StartDate   time.Time `json:"start_date" example:""`
		EndDate     time.Time `json:"end_date" example:""`
		KeyNote     string    `json:"key_note" example:""`
		StartAmount float64   `json:"start_amount" example:"10000"`
		EndAmount   float64   `json:"end_amount" example:"2500000"`
	}
)
