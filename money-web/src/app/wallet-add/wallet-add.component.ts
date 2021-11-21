import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DropDownList} from './model';
import {WalletService} from "../services/wallet.service";
import {WalletView} from "../view-model/wallet";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TransactionAddCategoryComponent} from "../transaction-add/transaction-add-category/transaction-add-category.component";
import {WalletAddIconComponent} from "./wallet-add-icon/wallet-add-icon.component";
import {WalletAddCurrencyComponent} from "./wallet-add-currency/wallet-add-currency.component";


@Component({
    selector: 'app-wallet-add',
    templateUrl: './wallet-add.component.html',
    styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {
    @Input() wallet!: WalletView;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private walletService: WalletService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
    }

    onChangeWalletName(value: string): void {
        this.wallet.name = value;
    }

    onAddCurrency(): void {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Choose Currency',
            nzClassName: "add-wallet-currency-modal",
            nzContent: WalletAddCurrencyComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                currencyInfo: this.wallet.currency,
                fallbackFunc: (currencyCode: string) => {
                    this.wallet.currency = currencyCode
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: []
        });
    }

    onAddIcon(): void {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Choose Icon',
            nzClassName: "add-wallet-icon-modal",
            nzContent: WalletAddIconComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                choseIcon: this.wallet.icon,
                callbackFunc: (iconName: string) => {
                    this.wallet.icon = iconName
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: []
        });
    }

    getCurrencyName(code: string): string {
        for (let curItem of this.CurrencyList) {
            if (curItem.code === code) {
                return curItem.text;
            }
        }
        return "";
    }

    CurrencyList: DropDownList[] = [
        {code: "VND", text: "Việt Nam Đồng"},
    ]

}
