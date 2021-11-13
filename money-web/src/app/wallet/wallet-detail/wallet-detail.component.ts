import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    selectWallet() {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.left != '23%' && dialogDetail.hidden) {
            dialog[0].style.left = "23%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }
    }

    hideWalletDetail() {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.left == '23%' && !dialogDetail.hidden) {
            dialog[0].style.left = "50%";
            dialogDetail.hidden = true;
        }
    }

    editWalletDetail() {
        this.editWallet.emit();
    }

    @Output() editWallet = new EventEmitter<string>();

}
