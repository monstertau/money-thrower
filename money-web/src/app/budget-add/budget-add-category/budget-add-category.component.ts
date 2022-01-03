import { Component, Input, OnInit } from '@angular/core';
import { categoryType, CategoryView } from 'src/app/view-model/category';

@Component({
  selector: 'app-budget-add-category',
  templateUrl: './budget-add-category.component.html',
  styleUrls: ['./budget-add-category.component.css']
})
export class BudgetAddCategoryComponent implements OnInit {

    @Input() categories!: CategoryView[];
    debtLoanCategories: CategoryView[] = [];
    expenseCategories: CategoryView[] = [];
    // incomeCategories: CategoryView[] = [];
    debtLoanCategoriesShow: CategoryView[] = [];
    expenseCategoriesShow: CategoryView[] = [];
    // incomeCategoriesShow: CategoryView[] = [];
    @Input() callbackFunc!: Function;
    activeTab: number = 0;
    searchContent: string = "";

    constructor() {

    }

    ngOnInit(): void {
        for (let category of this.categories) {
            switch (category.type) {
                case categoryType.INCOME:
                    // this.incomeCategories.push(category);
                    break;
                case categoryType.OUTCOME:
                    this.expenseCategories.push(category);
                    break;
                // case categoryType.OTHERS:
                //     this.debtLoanCategories.push(category);
                //     break;
            }

            if (category.type === categoryType.OTHERS) {
                if (category.name == 'Loan' || category.name == 'Repayment') {
                    this.debtLoanCategories.push(category);
                }
            }
        }
        this.debtLoanCategoriesShow = this.filterResults(this.debtLoanCategories, '')
        this.expenseCategoriesShow = this.filterResults(this.expenseCategories, '')
        // this.incomeCategoriesShow = this.filterResults(this.incomeCategories, '')
    }

    onChangeSearchBox(value: string) {
        this.searchContent = value;
        this.debtLoanCategoriesShow = this.filterResults(this.debtLoanCategories, this.searchContent)
        this.expenseCategoriesShow = this.filterResults(this.expenseCategories, this.searchContent)
        // this.incomeCategoriesShow = this.filterResults(this.incomeCategories, this.searchContent)
    }

    filterResults(list: CategoryView[], keyword: string): CategoryView[] {
        return list.filter(x => {
            const arr = x.name.toLowerCase().split(' ');
            return arr.some(y => {
                return y.includes(keyword.toLowerCase())
            })
        });
    }

    getCurrentCategory(): CategoryView {
        for (let category of this.categories) {
            if (category.isCurrent) {
                return category;
            }
        }
        return new CategoryView()
    }

    onClickCategory(id: string) {
        for (let category of this.categories) {
            if (category.isCurrent) {
                category.isCurrent = false;
            }
            if (category.id === id) {
                category.isCurrent = true;
            }
        }
        this.callbackFunc(true)
    }

}
