package view

import (
	"money-core/model"
	"time"
)

type (
	// TransactionForm Use for Get detail or Delete a transaction
	TransactionForm struct {
		TransactionId   string    `json:"transaction_id"`
		UserId          string    `json:"user_id"`
		WalletId        string    `json:"wallet_id"`
		CatId           string    `json:"cat_id"`
		Amount          float64   `json:"amount"`
		Note            string    `json:"note"`
		TransactionDate time.Time `json:"transaction_date"`
	}
	// FilterTransactionForm Use for filtering for list of transactions
	FilterTransactionForm struct {
		WalletId    string    `json:"wallet_id" example:"dda1d792-337b-476b-adbc-f81b06baa0d0"`
		CatId       string    `json:"cat_id" example:"f3b91567-3496-4d9b-9f1e-ca69c92b89a6"`
		StartDate   time.Time `json:"start_date" example:"1960-06-23T20:29:39.688+07:00"`
		EndDate     time.Time `json:"end_date" example:"2099-06-23T20:29:39.688+07:00"`
		KeyNote     string    `json:"key_note" example:"mua"`
		StartAmount float64   `json:"start_amount" example:"1"`
		EndAmount   float64   `json:"end_amount" example:"999999"`
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
