package model

type Category struct {
	Id           string `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	OwnerId      string `json:"owner_id"`
	ParentCatId  string `json:"parent_cat_id"`
	CategoryName string `json:"cat_name"`
	IsExpense    bool   `json:"is_expense"`
	Icon         string `json:"icon"`
	Type         int    `json:"type"`
}
