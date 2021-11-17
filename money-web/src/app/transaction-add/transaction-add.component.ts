import {Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {TransactionView} from "../view-model/transactions";
import {Utils} from "../util/utils";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TransactionAddCategoryComponent} from "./transaction-add-category/transaction-add-category.component";
import {TransactionAddWalletComponent} from "./transaction-add-wallet/transaction-add-wallet.component";
import {WalletService} from "../services/wallet.service";
import {takeUntil} from "rxjs/operators";
import {WalletView} from "../view-model/wallet";
import {Subject} from "rxjs";

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
    @Input() transaction = new TransactionView();
    private readonly destroy$ = new Subject();
    wallets: WalletView[] = [];
    @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

    constructor(private walletService: WalletService, private transactionService: TransactionService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    }

    onChangeAmount(value: string): void {
        let res = value.replace(/\D/g, "");

        if (res === null || res.length <= 0) {
            this.transaction.amount = 0;
            this.inputElement!.nativeElement.value = this.getFormatAmount();
            return;
        }
        let numberAmount = parseInt(res);
        if (numberAmount < 200000000000) {
            this.transaction.amount = numberAmount
        }
        this.inputElement!.nativeElement.value = this.getFormatAmount();
        console.log(this.transaction);
    }

    getFormatAmount(): string {
        return Utils.formatNumber(this.transaction.amount.toString())
    }

    onChangeNote(value: string): void {
        this.transaction.note = value;
        console.log(this.transaction);
    }


    onChangeDate(result: Date): void {
        this.transaction.transactionDate = result;
        console.log(this.transaction);
    }

    ngOnInit(): void {
        this.walletService.getWalletPaging(0, 100).pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    res.forEach(element => {
                        let walletView = new WalletView().addWallet(element)
                        if (walletView.id === this.transaction.wallet.id) {
                            walletView.isCurrent = true;
                        }
                        this.wallets.push(walletView);
                    });

                },
                (err) => {
                    console.log(err)
                }
            )
    }

    addTransaction() {
        console.log(this.transaction);
        // this.transactionService.addTransaction(this.transaction.toTransaction())
    }

    onAddCategory() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Category',
            nzClassName: "add-transaction-category-modal",
            nzContent: TransactionAddCategoryComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {},
            nzWidth: 500,
            nzFooter: []
        });
    }

    onAddWallet() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Wallet',
            nzClassName: "add-transaction-wallet-modal",
            nzContent: TransactionAddWalletComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                wallets: this.wallets
            },
            nzWidth: 500,
            nzBodyStyle: {
                "padding": "0",
            },
            nzFooter: [],

        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
