import {Component, Input, OnInit} from '@angular/core';
import {Transaction, TransactionView} from "../../view-model/transactions";
import {id} from "@swimlane/ngx-charts";

@Component({
    selector: 'app-transaction-history-popup',
    templateUrl: './transaction-history-popup.component.html',
    styleUrls: ['./transaction-history-popup.component.css']
})
export class TransactionHistoryPopupComponent implements OnInit {

    @Input() transactions:TransactionView[][];

    constructor() {
        this.transactions = [];
        const day1 = [new TransactionView()];
        this.transactions.push(day1);
    }

    ngOnInit(): void {
    }

}
