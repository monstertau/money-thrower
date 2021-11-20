import {Component, OnInit} from '@angular/core';
import {TransactionView} from "../../../view-model/transactions";
import {WalletView} from "../../../view-model/wallet";

@Component({
    selector: 'app-topbar-wallet',
    templateUrl: './topbar-wallet.component.html',
    styleUrls: ['./topbar-wallet.component.css']
})
export class TopbarWalletComponent implements OnInit {

    showAddModal = false;
    walletAddLoading = false;
    currentWallet!: WalletView;

    constructor() {
    }

    ngOnInit(): void {
        this.currentWallet = new WalletView();
    }

    showWalletAddModal() {
        this.showAddModal = true;
    }

    handleCancelAdd() {
        this.showAddModal = false;
    }

    handleSave() {

    }

    addWallet() {

    }

}
