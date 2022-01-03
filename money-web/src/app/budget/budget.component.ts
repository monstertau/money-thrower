import {Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/services/common.service';
import { TransactionView } from '../view-model/transactions'
import {Category, CategoryView} from '../view-model/category';
import {Budget, BudgetView} from '../view-model/budget'
import {Utils} from '../util/utils';
import {Router} from '@angular/router';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    isLoading: boolean = false;

    budgets: BudgetView[] = [];
    selectedBudget!: BudgetView;
    selected: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    onBudgetSelected(budget: BudgetView) {
        this.selectedBudget = budget
        this.selected = true;
    }

    onBudgetDetailClose(closed: boolean) {
        this.selected = closed;
    }

}
