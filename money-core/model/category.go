package model

type Category struct {
	Id          string `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ParentCatId string `json:"parent_cat_id"`
	OwnerId     string `json:"owner_id"`
	IsExpense   bool   `json:"is_expense"`
	CatName     string `json:"cat_name"`
	Icon        string `json:"icon"`
}
