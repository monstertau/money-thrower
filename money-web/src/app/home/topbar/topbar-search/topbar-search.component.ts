import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputDaterangeComponent } from 'src/app/components/input-daterange/input-daterange.component';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { WalletService } from 'src/app/services/wallet.service';
import { TransactionAddCategoryComponent } from 'src/app/transaction-add/transaction-add-category/transaction-add-category.component';
import { TransactionAddWalletComponent } from 'src/app/transaction-add/transaction-add-wallet/transaction-add-wallet.component';
import { CategoryView } from 'src/app/view-model/category';
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

    constructor(private router: Router, private commonServce: CommonService, private categoryService: CategoryService, private walletService: WalletService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
        this.commonServce.currentWallet.subscribe(res => {
            this.currentWalletId = res;
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
        console.log('wallet:', this.selectedWallet.id);
        console.log('category:', this.selectedCategory.id);
        console.log('start_amount:', this.start);
        console.log('end_amount:', this.end);
        console.log('note:', this.note);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
