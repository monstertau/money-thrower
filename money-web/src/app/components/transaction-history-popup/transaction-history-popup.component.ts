import {Component, Input, OnInit} from '@angular/core';
import {Transaction, TransactionView} from "../../view-model/transactions";

@Component({
    selector: 'app-transaction-history-popup',
    templateUrl: './transaction-history-popup.component.html',
    styleUrls: ['./transaction-history-popup.component.css']
})
export class TransactionHistoryPopupComponent implements OnInit {

    @Input() transactions:TransactionView[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
