import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {CommonService, ViewMode} from 'src/app/services/common.service';
import {TransactionAddComponent} from 'src/app/transaction-add/transaction-add.component';
import {Utils} from 'src/app/util/utils';
import {TransactionView} from 'src/app/view-model/transactions';
import {WalletView} from 'src/app/view-model/wallet';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {TransactionService} from "../../../services/transaction.service";

@Component({
    selector: 'app-topbar-transaction',
    templateUrl: './topbar-transaction.component.html',
    styleUrls: ['./topbar-transaction.component.css']
})
export class TopbarTransactionComponent implements OnInit {
    currentPage!: string;
    currentMode: string = ViewMode.CAT;
    currentMonth!: string;
    viewToolTip: string;
    showAddModal = false;
    transactionAddLoading = false;
    currentTransaction!: TransactionView;
    @Input() wallets: WalletView[] = [];

    constructor(private transactionService: TransactionService, private notification: NzNotificationService, private modal: NzModalService, private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
        switch (this.currentMode) {
            case ViewMode.TRANS:
                this.viewToolTip = "View by " + ViewMode.CAT;
                break;
            default:
                this.viewToolTip = "View by transaction";
                break;
        }
    }

    ngOnInit(): void {
        this.commonService.currentViewMode.subscribe(mode => {
            this.currentMode = mode
        });
        this.commonService.currentPage.subscribe(page => {
            this.currentPage = page;
        });
        this.commonService.currentMonth.subscribe(month => {
            this.currentMonth = month
        });
        this.currentTransaction = new TransactionView().addWalletView(this.getCurrentWallet())
    }

    getFormatAmount(value: number): string {
        return Utils.formatNumber(value.toString())
    }

    getCurrentWallet(): WalletView {
        for (let wallet of this.wallets) {
            if (wallet.isCurrent) {
                return wallet;
            }
        }
        return new WalletView();
    }

    showTransactionAddModal() {
        this.showAddModal = true;
    }

    handleCancelAdd() {
        this.showAddModal = false;
        this.currentTransaction = new TransactionView().addWalletView(this.getCurrentWallet())
    }

    handleSave() {
        this.transactionAddLoading = true;
        this.addTransaction()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.transactionAddLoading = false;
                    this.showAddModal = false;
                    this.currentTransaction = new TransactionView().addWalletView(this.getCurrentWallet())
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.transactionAddLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async addTransaction() {
        let error = null;
        if (this.currentTransaction.amount == 0) {
            error = new Error("Please fill in transaction amount")
        }
        if (!this.currentTransaction.category.isCurrent) {
            error = new Error("Please choose transaction category")
        }
        this.transactionService.createTransaction(this.currentTransaction.toTransaction()).subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
            }
        )
        if (error !== null) {
            throw error
        }
    }


    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

    jumpToToday() {
        if (this.currentMonth != 'this') {
            this.commonService.reloadComponent();
            this.router.navigate(['/']);
        }
    }

    changeViewMode() {
        if (this.currentMode === ViewMode.CAT) {
            this.currentMode = ViewMode.TRANS;
            this.viewToolTip = "View by category";
            this.commonService.changeViewMode(this.currentMode);
        } else {
            this.currentMode = ViewMode.CAT;
            this.viewToolTip = "View by transaction";
            this.commonService.changeViewMode(this.currentMode);
        }
    }

    search() {
        // this.router.navigate(['/search']);
        // this.commonService.changePage('search');
        // this.commonService.reloadComponent();
        // this.commonService.changeSearchResults([]);
        window.location.href = '/search';
    }

}
