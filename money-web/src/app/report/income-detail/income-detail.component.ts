import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {DataPoint, DataRange} from "../../view-model/data-range";
import {Utils} from "../../util/utils";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TransactionHistoryPopupComponent } from 'src/app/components/transaction-history-popup/transaction-history-popup.component';

@Component({
    selector: 'app-income-detail',
    templateUrl: './income-detail.component.html',
    styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
    @Output() closed = new EventEmitter<boolean>();
    @Input() title!: string;
    @Input() income!: string;

    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() isLoading!:boolean
    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
    }

    hideReportDetail() {
        this.closed.emit(true);
        let dialog = document.getElementById('income-detail') as HTMLElement;
        dialog.hidden = true;
        let dialogList = document.getElementsByClassName('main-report') as HTMLCollectionOf<HTMLElement>;
        if (dialogList.length > 0) {
            dialogList[0].style.marginLeft = '50%';
            dialogList[0].style.width = "50%";
        }
    }
    formatCurrency(balance:number):string{
        return Utils.formatCurrency(balance)
    }
    triggerShowPopup(title: string,startDate: Date, endDate: Date, dataRange: DataRange,type:string) {
        const modal: NzModalRef = this.modal.create({
            nzTitle: title,
            nzClassName: "debt-transaction-history",
            nzContent: TransactionHistoryPopupComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {startDate,endDate,dataRange,type},
            nzBodyStyle: {
                "padding": "0",
            },
            nzWidth: 500,
            nzFooter: []
        });
    }
}
