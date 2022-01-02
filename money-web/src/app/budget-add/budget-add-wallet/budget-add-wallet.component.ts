import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/util/utils';
import { WalletView } from 'src/app/view-model/wallet';

@Component({
  selector: 'app-budget-add-wallet',
  templateUrl: './budget-add-wallet.component.html',
  styleUrls: ['./budget-add-wallet.component.css']
})
export class BudgetAddWalletComponent implements OnInit {

    @Input() wallets!: WalletView[];
    @Output() walletsChange = new EventEmitter<WalletView[]>();
    @Input() callbackFunc!: Function;

    constructor(private commonService: CommonService) {

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
                this.commonService.changeWallet(id);
            }
        }
        this.walletsChange.emit(this.wallets)
        this.callbackFunc()
    }

}
