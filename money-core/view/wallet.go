package view

import "money-core/model"

type (
	WalletForm struct {
		WalletId       string  `json:"id" example:"id"`
		UserId         string  `json:"user_id,omitempty" swaggerignore:"true"`
		WalletName     string  `json:"name" example:"MyBankAccount"`
		WalletType     int     `json:"type" example:"1"`
		WalletCurrency string  `json:"currency" example:"VND"`
		WalletBalance  float64 `json:"balance" example:"1500000"`
		WalletIconPath string  `json:"icon" example:"mua_sam"`
	}
)

func (f *WalletForm) ToWalletModel() *model.Wallet {
	return &model.Wallet{
		UserId:     f.UserId,
		WalletName: f.WalletName,
		Type:       f.WalletType,
		Currency:   f.WalletCurrency,
		Balance:    f.WalletBalance,
		Icon:       f.WalletIconPath,
	}
}

func ToWalletView(w *model.Wallet) *WalletForm {
	return &WalletForm{
		WalletId:       w.Id,
		WalletName:     w.WalletName,
		WalletType:     w.Type,
		WalletCurrency: w.Currency,
		WalletBalance:  w.Balance,
		WalletIconPath: w.Icon,
	}
}
