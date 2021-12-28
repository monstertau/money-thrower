import {Component, Input, OnInit} from '@angular/core';
import {Transaction, TransactionView} from "../../view-model/transactions";
import {id} from "@swimlane/ngx-charts";
import { DataRange } from 'src/app/view-model/data-range';

@Component({
    selector: 'app-transaction-history-popup',
    templateUrl: './transaction-history-popup.component.html',
    styleUrls: ['./transaction-history-popup.component.css']
})
export class TransactionHistoryPopupComponent implements OnInit {

    @Input() transactions:TransactionView[][] = [];
    @Input() inflow: number = 0;
    @Input() outflow: number = 0;

    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() type!: string;

    currentPage: string = 'search';

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.startDate)
        console.log(this.dataRange.dataUnits)
        if (this.dataRange.dataUnits.length) {
            if(this.type == "debt"){
                for (let dataUnit of this.dataRange.dataUnits) {
                    if(dataUnit.debtTransaction.length>0){
                        this.transactions.push(dataUnit.debtTransaction);
                        // for(let i= 0; i< dataUnit.debtTransaction.length;i++){
                        //     this.inflow += dataUnit.debtTransaction[i].amount;
                        // }
                        this.inflow += dataUnit.totalDebt;
                    }
                
                }
            }
            if(this.type == "loan"){
                for (let dataUnit of this.dataRange.dataUnits) {
                    if(dataUnit.loanTransaction.length>0){
                        this.transactions.push(dataUnit.loanTransaction);
                        this.outflow += dataUnit.totalLoan;
                    }
                
                }
            }
            if(this.type == "other"){
                for (let dataUnit of this.dataRange.dataUnits) {
                    if(dataUnit.otherTransaction.length>0){
                        this.transactions.push(dataUnit.otherTransaction);
                        this.inflow += dataUnit.otherInflow;
                        this.outflow += dataUnit.otherOutflow;
                    }
                
                }
            }
            if(this.type == "daily"){
                for (let dataUnit of this.dataRange.dataUnits) {
                    if(dataUnit.startDate == this.startDate){
                        this.transactions.push(dataUnit.dailyTransaction);
                        this.inflow += dataUnit.totalIncome;
                        this.outflow += dataUnit.totalOutcome;
                    }
                
                }
            }
            
        }
        console.log(this.transactions);
    }

}
