export enum categoryType {
    INCOME = "income",
    OUTCOME = "outcome",
    OTHERS = "debt/loan"
}

export interface Category {
    id: string,
    type: number,
    name: string,
    icon: string,
    is_expense: boolean,
    parent_cat_id: string,
    owner_id: string
}

export class CategoryView {
    id: string;
    type: string;
    name: string;
    icon: string;
    ownerId: string;
    isExpense: boolean;
    isCurrent: boolean;
    isCustom: boolean;
    fallbackIcon: string;

    constructor() {
        this.id = "";
        this.type = categoryType.OTHERS;
        this.name = "Others";
        this.ownerId ="";
        this.icon = "null";
        this.isExpense = true;
        this.isCurrent = false;
        this.isCustom = false;
        this.fallbackIcon = 'assets/catalogs/null'
    }

    getTypeNumber(): number {
        switch (this.type) {
            case categoryType.OTHERS:
                return 0;
            case categoryType.INCOME:
                return 1;
            default:
                return 2;
        }
    }

  getIcon() {
    return `assets/catalogs/${this.icon}.png`
  }

  addCategory(category: Category): CategoryView {
    this.id = category.id;
    this.name = category.name;
    this.icon = category.icon;
    this.ownerId = category.owner_id;
    this.isExpense = category.is_expense;
    if(this.ownerId === "00000000-0000-0000-0000-000000000000") this.isCustom = false;
    else this.isCustom = true;
    switch (category.type) {
      case 1:
        this.type = categoryType.OUTCOME;
        break;
      case 2:
        this.type = categoryType.INCOME;
        break;
      default:
        this.type = categoryType.OTHERS;
        break;
    }
    return this;
  }

    toCategory(): Category {
        return {
            id: this.id,
            type: this.getTypeNumber(),
            name: this.name,
            icon: this.icon,
            owner_id: this.ownerId,
            is_expense: this.isExpense,
            parent_cat_id: "" // do we need to use this field?
        }
    }
}
