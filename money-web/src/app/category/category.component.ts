import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

    add_wallet = true;
    edit_wallet = false;
    add_edit_wallet_dialog = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    back() {
        window.location.href = '/home';
    }

    addWallet() {
        this.add_edit_wallet_dialog = true;
        this.add_wallet = true;
        this.edit_wallet = false;
    }

    editWallet() {
        this.add_edit_wallet_dialog = true;
        this.edit_wallet = true;
        this.add_wallet = false;
    }

    closeAddWallet() {
        this.add_edit_wallet_dialog = false;
    }

}
