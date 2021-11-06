package view

import (
	"money-core/model"
	"time"
)

type (
	// AddTransactionForm Use for add a transaction
	AddTransactionForm struct {
		TransactionId   string    `json:"transaction_id"  swaggerignore:"true" example:""`
		UserId          string    `json:"user_id" swaggerignore:"true"`
		WalletId        string    `json:"wallet_id" binding:"required"`
		CatId           string    `json:"cat_id" binding:"required"`
		Amount          float64   `json:"amount" binding:"required"`
		Note            string    `json:"note"`
		TransactionDate time.Time `json:"transaction_date"  swaggerignore:"true" gorm:"<-:false"`
	}
	EditTransactionForm struct {
		TransactionId string  `json:"transaction_id" binding:"required" example:""`
		UserId        string  `json:"user_id" swaggerignore:"true"`
		CatId         string  `json:"cat_id" binding:"required"`
		Amount        float64 `json:"amount" binding:"required"`
		Note          string  `json:"note"`
	}
	// TransactionForm Use for Get detail or Delete a transaction
	TransactionForm struct {
		TransactionId   string    `json:"transaction_id"  swaggerignore:"true" example:""`
		UserId          string    `json:"user_id" swaggerignore:"true"`
		WalletId        string    `json:"wallet_id" binding:"required"`
		CatId           string    `json:"cat_id" binding:"required"`
		Amount          float64   `json:"amount" binding:"required"`
		Note            string    `json:"note"`
		TransactionDate time.Time `json:"transaction_date"  swaggerignore:"true" gorm:"->"`
	}
	// DeleteTransactionForm Use for Delete a transaction using id
	DeleteTransactionForm struct {
		TransactionId string `json:"transaction_id" example:""`
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

func (f *AddTransactionForm) ToTransactionModel() *model.Transaction {
	return &model.Transaction{
		UserId:   f.UserId,
		WalletId: f.WalletId,
		CatId:    f.CatId,
		Amount:   f.Amount,
		Note:     f.Note,
	}
}
func (f *EditTransactionForm) ToTransactionModel() *model.Transaction {
	return &model.Transaction{
		Id:     f.TransactionId,
		UserId: f.UserId,
		CatId:  f.CatId,
		Amount: f.Amount,
		Note:   f.Note,
	}
}
