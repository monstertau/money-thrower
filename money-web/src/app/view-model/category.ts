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
    parent_cat_id: string
}

export class CategoryView {
    id: string;
    type: string;
    name: string;
    icon: string;
    isExpense: boolean;
    isCurrent: boolean;
    fallbackIcon: string;

    constructor() {
        this.id = "";
        this.type = categoryType.OTHERS;
        this.name = "Others";
        this.icon = "null";
        this.isExpense = true;
        this.isCurrent = false;
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
    switch (category.type) {
      case 1:
        this.type = categoryType.INCOME;
        break;
      case 2:
        this.type = categoryType.OUTCOME;
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
            is_expense: this.isExpense,
            parent_cat_id: "" // do we need to use this field?
        }
    }
}
