package view

import (
	"money-core/model"
	"money-core/util"
	"time"
)

type (
	// AddTransactionForm Use for add a transaction
	AddTransactionForm struct {
		TransactionId   string  `json:"transaction_id"  swaggerignore:"true" example:""`
		UserId          string  `json:"user_id" swaggerignore:"true"`
		WalletId        string  `json:"wallet_id" binding:"required"`
		CatId           string  `json:"cat_id" binding:"required"`
		Amount          float64 `json:"amount" binding:"required"`
		Note            string  `json:"note"`
		TransactionDate int64   `json:"transaction_date"`
	}
	EditTransactionForm struct {
		TransactionId   string  `json:"transaction_id" binding:"required" example:""`
		UserId          string  `json:"user_id" swaggerignore:"true"`
		CatId           string  `json:"cat_id" binding:"required"`
		Amount          float64 `json:"amount" binding:"required"`
		Note            string  `json:"note"`
		TransactionDate int64   `json:"transaction_date" gorm:"<-:update"`
	}
	// TransactionForm Use for Get detail or Delete a transaction
	TransactionForm struct {
		TransactionId   string  `json:"transaction_id"`
		UserId          string  `json:"user_id"`
		WalletId        string  `json:"wallet_id"`
		CatId           string  `json:"cat_id"`
		Amount          float64 `json:"amount"`
		Note            string  `json:"note"`
		TransactionDate int64   `json:"transaction_date"`
	}
	// FilterTransactionForm Use for filtering for list of transactions
	FilterTransactionForm struct {
		WalletId    string  `json:"wallet_id" example:"dda1d792-337b-476b-adbc-f81b06baa0d0"`
		CatId       string  `json:"cat_id" example:"f3b91567-3496-4d9b-9f1e-ca69c92b89a6"`
		StartDate   int64   `json:"start_date" example:"-1036206827000"`
		EndDate     int64   `json:"end_date" example:"1936206829000"`
		KeyNote     string  `json:"key_note" example:"mua"`
		StartAmount float64 `json:"start_amount" example:"1"`
		EndAmount   float64 `json:"end_amount" example:"999999"`
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
		TransactionDate: util.NormalizeTimeAsMilliseconds(t.TransactionDate.Unix()),
	}
}

func (f *AddTransactionForm) ToTransactionModel() *model.Transaction {
	transactionDate := util.NormalizeTimeAsMilliseconds(f.TransactionDate)
	return &model.Transaction{
		UserId:          f.UserId,
		WalletId:        f.WalletId,
		CatId:           f.CatId,
		Amount:          f.Amount,
		Note:            f.Note,
		TransactionDate: time.Unix(0, transactionDate*int64(time.Millisecond)),
	}
}
func (f *EditTransactionForm) ToTransactionModel() *model.Transaction {
	transactionDate := util.NormalizeTimeAsMilliseconds(f.TransactionDate)
	return &model.Transaction{
		Id:              f.TransactionId,
		UserId:          f.UserId,
		CatId:           f.CatId,
		Amount:          f.Amount,
		Note:            f.Note,
		TransactionDate: time.Unix(0, transactionDate*int64(time.Millisecond)),
	}
}
