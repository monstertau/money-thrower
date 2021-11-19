import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wallet, WalletService} from "../../services/wallet.service";
import {WalletView} from "../../view-model/wallet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Utils} from "../../util/utils";

@Component({
    selector: 'app-transaction-add-wallet',
    templateUrl: './transaction-add-wallet.component.html',
    styleUrls: ['./transaction-add-wallet.component.css']
})
export class TransactionAddWalletComponent implements OnInit {
    @Input() wallets!: WalletView[];
    @Output() walletsChange = new EventEmitter<WalletView[]>();
    @Input() callbackFunc!: Function;

    constructor() {

    }

    ngOnInit(): void {
    }

    getCurrentWallet() :WalletView{
        for(let wallet of this.wallets){
            if (wallet.isCurrent) {
                return wallet;
            }
        }
        return new WalletView();
    }
    getFormatAmount(value: number) {
        return Utils.formatNumber(value.toString())
    }

    onClickWallet(id: string) {
        for (let wallet of this.wallets) {
            if (wallet.isCurrent) {
                wallet.isCurrent = false;
            }
            if (wallet.id === id) {
                wallet.isCurrent = true;
            }
        }
        this.walletsChange.emit(this.wallets)
        this.callbackFunc()
    }
}
