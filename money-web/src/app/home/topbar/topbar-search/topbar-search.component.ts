import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputDaterangeComponent } from 'src/app/components/input-daterange/input-daterange.component';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionFilter, TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';
import { TransactionAddCategoryComponent } from 'src/app/transaction-add/transaction-add-category/transaction-add-category.component';
import { TransactionAddWalletComponent } from 'src/app/transaction-add/transaction-add-wallet/transaction-add-wallet.component';
import { CategoryView } from 'src/app/view-model/category';
import { TransactionView } from 'src/app/view-model/transactions';
import { WalletView } from 'src/app/view-model/wallet';

@Component({
    selector: 'app-topbar-search',
    templateUrl: './topbar-search.component.html',
    styleUrls: ['./topbar-search.component.css']
})
export class TopbarSearchComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();
    wallets: WalletView[] = [];
    categories: CategoryView[] = [];
    hasChooseCategory: boolean = false;
    currentWalletId: string = '';
    @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

    selectedWallet: WalletView = new WalletView();
    selectedCategory: CategoryView = new CategoryView();
    note: string = '';
    selectedTimeRange: string = '';

    currentMonth = new Date().getMonth() + 1;
    currentYear = new Date().getFullYear();
    dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();

    currentSearchResults: TransactionView[][] = [];
    inflow: number = 0;
    outflow: number = 0;
    total: number = 0;

    constructor(private router: Router, private commonServce: CommonService, private categoryService: CategoryService, private walletService: WalletService, private transactionService: TransactionService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
        this.commonServce.currentWallet.subscribe(res => {
            this.currentWalletId = res;
        })
        this.commonServce.currentSearchResults.subscribe(res => {
            this.currentSearchResults = res;
        })
    }

    ngOnInit(): void {
        this.walletService.getWalletPaging(0, 100).pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    res.forEach(element => {
                        let walletView = new WalletView().addWallet(element)
                        if (walletView.id === this.currentWalletId) {
                            walletView.isCurrent = true;
                            this.selectedWallet.addWallet(walletView);
                        }
                        this.wallets.push(walletView);
                    });

                },
                (err) => {
                    console.log(err)
                }
            )
        this.categoryService.getAllCategory().subscribe((res) => {
            res.forEach(element => {
                let categoryView = new CategoryView().addCategory(element)
                this.categories.push(categoryView);
            });

        },
            (err) => {
                console.log(err)
            })
    }

    onAddCategory() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Category',
            nzClassName: "add-transaction-category-modal",
            nzContent: TransactionAddCategoryComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                categories: this.categories,
                callbackFunc: (hasChooseCategory: boolean) => {
                    this.hasChooseCategory = hasChooseCategory
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: []
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            this.selectedCategory.addCategory(instance.getCurrentCategory());
        });
    }

    onAddWallet() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Wallet',
            nzClassName: "add-transaction-wallet-modal",
            nzContent: TransactionAddWalletComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                wallets: this.wallets,
                callbackFunc: () => modal.destroy()
            },
            nzWidth: 500,
            nzBodyStyle: {
                "padding": "0",
            },
            nzFooter: [],
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            this.selectedWallet.addWallet(instance.getCurrentWallet())
        });
    }

    onAddDateRange() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select time range',
            nzClassName: "add-time-range-modal",
            nzContent: InputDaterangeComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                currentMonth: this.currentMonth,
                currentYear: this.currentYear,
                callbackFunc: () => modal.destroy()
            },
            nzWidth: 500,
            nzBodyStyle: {
                "padding": "0",
            },
            nzFooter: [],
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            this.selectedTimeRange = instance.getSelectedRange();
        });
    }

    start = 10000;
    end = 10000000;
    rangeValue = [this.start, this.end];

    onChange(value: number): void {
        let string = value.toString();
        let first = string.split(',')[0];
        let second = string.split(',')[1];
        this.start = parseInt(first);
        this.end = parseInt(second);
    }

    back() {
        this.router.navigate(['/']);
        this.commonServce.changePage('transaction');
    }

    reset() {
        this.commonServce.reloadComponent();
    }

    search() {
        this.getTransactions();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formateDate() {
        if (this.selectedTimeRange === '') {
            return [0, 0];
        }
        let startDate = this.selectedTimeRange.split(' - ')[0];
        let el1 = startDate.split('/');
        let start = el1[2] + '-' + el1[1] + '-' + el1[0];
        let endDate = this.selectedTimeRange.split(' - ')[1];
        let el2 = endDate.split('/');
        let end = el2[2] + '-' + el2[1] + '-' + el2[0];
        return [new Date(`${start} 00:00:00 +0000`).getTime(), new Date(`${end} 23:59:59 +0000`).getTime()];
    }


    getWallet(transaction: TransactionView) {
        this.walletService.getWalletById(this.currentWalletId).subscribe(
            data => {
                transaction.addWallet(data);
            }
        );
    }

    getCategory(transaction: TransactionView) {
        this.categoryService.getCategoryById(transaction.category.id).subscribe(data => {
            transaction.addCategory(data);
            this.calculateFlow(transaction);
        })
    }

    getTransactions() {
        let filter: TransactionFilter = {
            start_date: this.formateDate()[0],
            end_date: this.formateDate()[1],
            start_amount: this.start,
            end_amount: this.end,
            wallet_id: this.selectedWallet.id,
            cat_id: this.selectedCategory.id,
            key_note: this.note,
        }
        let days: string[] = [];
        this.transactionService.getTransactions(filter).subscribe(transactions => {
            let items: TransactionView[] = [];
            transactions.forEach(transaction => {
                let transactionView: TransactionView = new TransactionView().addTransaction(transaction);
                transactionView.category.id = transaction.cat_id;
                this.getCategory(transactionView);
                this.getWallet(transactionView);
                items.push(transactionView);
                if (!days.includes(transactionView.transactionDate.toDateString())) days.push(transactionView.transactionDate.toDateString());
            })
            let dateUnix: number[] = [];
            days.forEach(day => {
                dateUnix.push(new Date(day).getTime());
            });
            dateUnix = dateUnix.sort((a, b) => b - a);
            dateUnix.forEach(day => {
                let trans = items.filter(x => x.transactionDate.toDateString() == new Date(day).toDateString())
                this.currentSearchResults.push(trans)
            })
            this.commonServce.changeSearchResults(this.currentSearchResults);
        })
    }

    calculateFlow(transaction: TransactionView) {
        if (!transaction.category.isExpense) this.inflow += transaction.amount;
        else this.outflow += transaction.amount;
        this.commonServce.changeFlow(this.inflow, this.outflow);
    }

}
