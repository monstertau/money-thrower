import { Component, OnInit } from '@angular/core';
import { Wallet, WalletService } from 'src/app/services/wallet.service';

@Component({
    selector: 'app-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

    walletList: Wallet[] = [];

    selectedWallet: Wallet = {
        id: "",
        name: "",
        type: 0,
        currency: "",
        balance: 0,
        icon: ""
    };

    pageSize: number = 10;

    pageOffset: number = 0;

    isListLoading: boolean = false;

    isDetailLoading: boolean = true;

    get isListEmpty(): boolean {
        return this.walletList.length <= 0
    }

    constructor(private walletService: WalletService) { }

    ngOnInit() {
        this.loadWalletList();
    }

    loadMore() {
        this.pageOffset += this.pageSize;
        this.loadWalletList;
    }

    loadWalletList() {
        this.isListLoading = true;
        this.walletService.getWalletPaging(this.pageOffset, this.pageSize).subscribe(
            (res) => {
                console.log(res);
                res.forEach(element => {
                    this.walletList.push(element);
                });
            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isListLoading = false;
            }
        )
    }

    loadWalletDetail(id: string) {
        this.isDetailLoading = true;
        this.walletService.getWalletById(id).subscribe(
            (res) => {
                console.log(res);
                this.selectedWallet = res;
            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isDetailLoading = false;
            }
        )
    }

    selectWallet(id: string) {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.left != '23%' && dialogDetail.hidden) {
            dialog[0].style.left = "23%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }

        this.loadWalletDetail(id);
    }

    hideWalletDetail() {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.left == '23%' && !dialogDetail.hidden) {
            dialog[0].style.left = "50%";
            dialogDetail.hidden = true;
        }
    }

}
