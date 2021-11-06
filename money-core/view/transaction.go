package view

import (
	"money-core/model"
	"time"
)

type (
	// TransactionForm Use for Get detail or Delete a transaction
	TransactionForm struct {
		TransactionId   string    `json:"transaction_id" example:""`
		UserId          string    `json:"user_id" swaggerignore:"true"`
		WalletId        string    `json:"wallet_id"`
		CatId           string    `json:"cat_id"`
		Amount          float64   `json:"amount"`
		Note            string    `json:"note"`
		TransactionDate time.Time `json:"transaction_date"`
	}
	// FilterTransactionForm Use for filtering for list of transactions
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

func ToTransactionForm(t *model.Transaction) *TransactionForm {
	return &TransactionForm{
		TransactionId:   t.Id,
		UserId:          t.UserId,
		WalletId:        t.WalletId,
		CatId:           t.CatId,
		Amount:          t.Amount,
		Note:            t.Note,
		TransactionDate: t.TransactionDate,
	}
}
