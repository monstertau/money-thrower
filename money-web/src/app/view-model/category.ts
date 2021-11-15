export enum categoryType {
  INCOME = "income",
  OUTCOME = "outcome",
  OTHERS = "others"
}

export interface Category {
  id: string,
  type: number,
  cat_name: string,
  icon: string,
}

export class CategoryView {
  id: string;
  type: string;
  name: string;
  icon: string

  constructor() {
    this.id = "";
    this.type = categoryType.OTHERS;
    this.name = "Others"
    this.icon = "null"
  }

  getTypeNumber(): number {
    switch (this.type) {
      case categoryType.INCOME:
        return 0;
      case categoryType.OUTCOME:
        return 1;
      default:
        return 2;
    }
  }

  addCategory(category: Category): CategoryView {
    this.id = category.id;
    this.name = category.cat_name;
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
      cat_name: this.name,
      icon: this.icon,
    }
  }
}
