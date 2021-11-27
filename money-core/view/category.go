package view

import "money-core/model"

type (
	CategoryForm struct {
		CategoryId        string `json:"id" example:"id"`
		OwnerId           string `json:"owner_id,omitempty" swaggerignore:"true"`
		CategoryName      string `json:"cat_name" example:"Food"`
		ParentCatId       string `json:"parent_cat_id" example:"id"`
		CategoryIsExpense bool   `json:"is_expense" example:"0"`
		CategoryIcon      string `json:"icon" example:"tool"`
		CategoryType      int    `json:"type" example:"1"`
	}
)

func (f *CategoryForm) ToCategoryModel() *model.Category {
	return &model.Category{
		ParentCatId: f.ParentCatId,
		CatName:     f.CategoryName,
		OwnerId:     f.OwnerId,
		IsExpense:   f.CategoryIsExpense,
		Icon:        f.CategoryIcon,
		Type:        f.CategoryType,
	}
}

func ToCategoryView(w *model.Category) *CategoryForm {
	return &CategoryForm{
		CategoryId:        w.Id,
		CategoryName:      w.CatName,
		OwnerId:           w.OwnerId,
		ParentCatId:       w.ParentCatId,
		CategoryIsExpense: w.IsExpense,
		CategoryType:      w.Type,
		CategoryIcon:      w.Icon,
	}
}
