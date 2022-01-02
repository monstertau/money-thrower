import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { WalletService } from '../services/wallet.service';
import { BudgetView } from '../view-model/budget';
import { CategoryView } from '../view-model/category';
import { WalletView } from '../view-model/wallet';
import { BudgetAddCategoryComponent } from './budget-add-category/budget-add-category.component';
import { BudgetAddWalletComponent } from './budget-add-wallet/budget-add-wallet.component';

@Component({
  selector: 'app-budget-add',
  templateUrl: './budget-add.component.html',
  styleUrls: ['./budget-add.component.css']
})
export class BudgetAddComponent implements OnInit {

    @Input() budget = new BudgetView();
    private readonly destroy$ = new Subject();
    wallets: WalletView[] = [];
    categories: CategoryView[] = [];
    hasChooseCategory: boolean = false;
    @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

    constructor(private categoryService: CategoryService, private walletService: WalletService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.walletService.getWalletPaging(0, 100).pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    res.forEach(element => {
                        let walletView = new WalletView().addWallet(element)
                        if (walletView.id === this.budget.wallet.id) {
                            walletView.isCurrent = true;
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

    // onChangeNote(value: string): void {
    //     this.transaction.note = value;
    // }


    // onChangeDate(result: Date): void {
    //     this.transaction.transactionDate = result;
    // }

    onAddCategory() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Category',
            nzClassName: "add-transaction-category-modal",
            nzContent: BudgetAddCategoryComponent,
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
            this.budget.category = instance.getCurrentCategory()
        });
    }

    onAddWallet() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Wallet',
            nzClassName: "add-transaction-wallet-modal",
            nzContent: BudgetAddWalletComponent,
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
            this.budget.wallet = instance.getCurrentWallet()
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
