package view

import (
	"money-core/model"
	"money-core/util"
	"time"
)

type (
	BudgetForm struct {
		Id        string  `json:"id"`
		UserId    string  `json:"user_id"`
		WalletId  string  `json:"wallet_id"`
		CatId     string  `json:"cat_id"`
		Amount    float64 `json:"amount"`
		StartDate int64   `json:"start_date"`
		EndDate   int64   `json:"end_date"`
		Status    int     `json:"status"`
	}
)

func ToBudgetForm(b *model.Budget) *BudgetForm {
	return &BudgetForm{
		Id:        b.Id,
		UserId:    b.UserId,
		WalletId:  b.WalletId,
		CatId:     b.CatId,
		Amount:    b.Amount,
		StartDate: util.NormalizeTimeAsMilliseconds(b.StartDate.Unix()),
		EndDate:   util.NormalizeTimeAsMilliseconds(b.EndDate.Unix()),
		Status:    b.Status,
	}
}

func (f *BudgetForm) ToBudgetModel() *model.Budget {
	startDate := util.NormalizeTimeAsMilliseconds(f.StartDate)
	endDate := util.NormalizeTimeAsMilliseconds(f.EndDate)
	return &model.Budget{
		Id:        f.Id,
		UserId:    f.UserId,
		WalletId:  f.WalletId,
		CatId:     f.CatId,
		Amount:    f.Amount,
		StartDate: time.Unix(0, startDate*int64(time.Millisecond)),
		EndDate:   time.Unix(0, endDate*int64(time.Millisecond)),
		Status:    f.Status,
	}
}
