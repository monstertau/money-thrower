import {Component, OnInit} from '@angular/core';
import {WalletView} from "../view-model/wallet";
import {CommonService} from "../services/common.service";
import {WalletService} from "../services/wallet.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
    currentWallet: WalletView = new WalletView();
    showAddModal: boolean = false;

    walletAddLoading = false;

    constructor(private commonService: CommonService, private walletService: WalletService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
    }

    back() {
        window.location.href = '/home';
    }

    onClickEdit(wallet: WalletView) {
        this.showAddModal = true;
        this.currentWallet = wallet;
    }

    async editWallet() {
        let error = null;
        if (this.currentWallet.balance == 0) {
            error = new Error("Please fill in wallet balance")
        }
        if (this.currentWallet.name.length == 0) {
            error = new Error("Please enter wallet name")
        }
        if (error !== null) {
            throw error;
        }
        this.walletService.editWallet(this.currentWallet.toWallet()).subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
            }
        )
        if (error !== null) {
            throw error;
        }
    }

    handleCancelAdd() {
        this.showAddModal = false;
    }

    handleSave() {
        this.walletAddLoading = true;
        this.editWallet()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.walletAddLoading = false;
                    this.showAddModal = false;
                    this.currentWallet = new WalletView()
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.walletAddLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

}
