import {Component, OnInit} from '@angular/core';
import {TransactionView} from "../../../view-model/transactions";
import {WalletView} from "../../../view-model/wallet";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {WalletService} from "../../../services/wallet.service";
import {CommonService} from "../../../services/common.service";

@Component({
    selector: 'app-topbar-wallet',
    templateUrl: './topbar-wallet.component.html',
    styleUrls: ['./topbar-wallet.component.css']
})
export class TopbarWalletComponent implements OnInit {

    showAddModal = false;
    walletAddLoading = false;
    currentWallet!: WalletView;

    constructor(private commonService: CommonService, private walletService: WalletService, private notification: NzNotificationService) {
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
        this.walletAddLoading = true;
        this.addWallet()
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

    async addWallet() {
        let error = null;
        if (this.currentWallet.balance == 0) {
            error = new Error("Please fill in wallet balance")
        }
        if (this.currentWallet.name.length == 0) {
            error = new Error("Please enter wallet name")
        }
        this.walletService.addWallet(this.currentWallet.toWallet()).subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
            }
        )
        if (error !== null) {
            throw error
        }

    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

}
