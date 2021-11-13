const INCOME = "income";
const OUTCOME = "outcome";
const OTHERS = "others";

export interface Category {
  id: string,
  type: number,
  cat_name: string,
  icon: string,
}

export class CategoryModel {
  id: string;
  type: string;
  name: string;
  icon: string

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.cat_name;
    this.icon = category.icon;
    switch (category.type) {
      case 1:
        this.type = INCOME;
        return;
      case 2:
        this.type = OUTCOME;
        return;
      default:
        this.type = OTHERS;
        return;
    }
  }

  getTypeNumber(): number {
    switch (this.type) {
      case INCOME:
        return 0;
      case OUTCOME:
        return 1;
      default:
        return 2;
    }
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
