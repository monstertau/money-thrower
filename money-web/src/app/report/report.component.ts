import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {WalletAddIconComponent} from "../wallet-add/wallet-add-icon/wallet-add-icon.component";
import {TransactionHistoryPopupComponent} from "../components/transaction-history-popup/transaction-history-popup.component";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    }
    triggerShowPopup(title:string){
        const modal: NzModalRef = this.modal.create({
            nzTitle: title,
            nzClassName: "debt-transaction-history",
            nzContent: TransactionHistoryPopupComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
            },
            nzWidth: 500,
            nzFooter: []
        });
    }
    ngOnInit(): void {
    }

}
