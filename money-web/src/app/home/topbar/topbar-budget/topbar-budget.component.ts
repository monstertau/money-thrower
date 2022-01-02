import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonService } from 'src/app/services/common.service';
import { BudgetView } from 'src/app/view-model/budget';

@Component({
  selector: 'app-topbar-budget',
  templateUrl: './topbar-budget.component.html',
  styleUrls: ['./topbar-budget.component.css']
})
export class TopbarBudgetComponent implements OnInit {

    showAddModal = false;
    budgetAddLoading = false;
    currentBudget!: BudgetView;

    constructor(private commonService: CommonService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.currentBudget = new BudgetView();
    }

    showBudgetAddModal() {
        this.showAddModal = true;
    }

    handleCancelAdd() {
        this.showAddModal = false;
    }

    handleSave() {
        this.budgetAddLoading = true;
        this.addBudget()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.budgetAddLoading = false;
                    this.showAddModal = false;
                    this.currentBudget = new BudgetView()
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.budgetAddLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async addBudget() {
        let error = null;
        if (this.currentBudget.amount == 0) {
            error = new Error("Please fill in budget amount!")
        }
        if (error !== null) {
            throw error
        }

    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

}
