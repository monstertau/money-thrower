import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonService } from 'src/app/services/common.service';
import { BudgetView } from 'src/app/view-model/budget';
import { WalletView } from 'src/app/view-model/wallet';

@Component({
  selector: 'app-topbar-budget',
  templateUrl: './topbar-budget.component.html',
  styleUrls: ['./topbar-budget.component.css']
})
export class TopbarBudgetComponent implements OnInit {

    showAddModal = false;
    budgetAddLoading = false;
    currentBudget!: BudgetView;

    selectedTimeRange = '';

    @Input() wallets: WalletView[] = [];

    constructor(private commonService: CommonService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.currentBudget = new BudgetView().addWalletView(this.getCurrentWallet());
    }

    getCurrentWallet(): WalletView {
        for (let wallet of this.wallets) {
            if (wallet.isCurrent) {
                return wallet;
            }
        }
        return new WalletView();
    }

    showBudgetAddModal() {
        this.showAddModal = true;
    }

    handleCancelAdd() {
        this.showAddModal = false;
        this.currentBudget = new BudgetView().addWalletView(this.getCurrentWallet());
    }

    handleSave() {
        this.budgetAddLoading = true;
        this.addBudget()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.budgetAddLoading = false;
                    this.showAddModal = false;
                    this.currentBudget = new BudgetView().addWalletView(this.getCurrentWallet());
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
            console.log('here')
            error = new Error("Please fill in budget amount!")
        }
        if (!this.currentBudget.category.isCurrent) {
            error = new Error("Please choose transaction category!")
        }
        if (this.currentBudget.startDate.getTime() == this.currentBudget.endDate.getTime()) {
            error = new Error("Please choose time range!")
        }
        console.log(this.currentBudget);
        // this.transactionService.createTransaction(this.currentTransaction.toTransaction()).subscribe(
        //     result => {
        //         console.log(result);
        //     },
        //     err => {
        //         console.log(err);
        //         error = new Error("Something wrong. please")
        //     }
        // )
        if (error !== null) {
            throw error
        }

    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

}
