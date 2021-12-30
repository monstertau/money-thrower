import {Component, Input,EventEmitter,Output, ViewContainerRef, OnInit} from '@angular/core';
import {DataRange, DataUnit} from "../../view-model/data-range";
import * as moment from "moment";
import { Utils } from 'src/app/util/utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TransactionHistoryPopupComponent } from '../transaction-history-popup/transaction-history-popup.component';
import { TransactionView } from 'src/app/view-model/transactions';



@Component({
    selector: 'app-report-detail-transaction',
    templateUrl: './report-detail-transaction.component.html',
    styleUrls: ['./report-detail-transaction.component.css']
})
export class ReportDetailTransactionComponent implements OnInit {

    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() outcomeList: DataPoint[] = [];
    @Input() incomeList: DataPoint[] = [];
    @Input() view?: any[];
    @Input() type!: string;

    @Input() typeOutcomeTransaction: TransactionView[][][] = [];
    @Input() typeIncomeTransaction: TransactionView[][][] = [];


    @Input() outcomeTransaction: TransactionView[][] = [];
    @Input() incomeTransaction: TransactionView[][] =[];

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {
        
        if (this.dataRange.dataUnits.length) {
            for (let dataUnit of this.dataRange.dataUnits) {
                if(dataUnit.outcomeList.length>0){
                    for(let i = 0; i< dataUnit.outcomeList.length;i++){
                        let dataPoint = {
                            name: dataUnit.outcomeList[i].name,
                            value: dataUnit.outcomeList[i].value
                        }
                        this.outcomeList.push(dataPoint);
                        
                    }
                    
                }
            
                for (let i = 0; i<this.outcomeList.length;i++){
                    for(let j = i+1;j<this.outcomeList.length;j++){
                        if(this.outcomeList[i].name == this.outcomeList[j].name){
                            this.outcomeList[i].value += this.outcomeList[j].value;
                            this.outcomeList.splice(j,1);
                        }
                    }
                }
            }
        
            
            for (let dataUnit of this.dataRange.dataUnits) {
                if(dataUnit.incomeList.length>0){
                    for(let i = 0; i< dataUnit.incomeList.length;i++){
                        let dataPoint = {
                            name: dataUnit.incomeList[i].name,
                            value: dataUnit.incomeList[i].value
                        }
                        this.incomeList.push(dataPoint);
                        
                    }
                    
                }
                for (let i = 0; i<this.incomeList.length;i++){
                    for(let j = i+1;j<this.incomeList.length;j++){
                        if(this.incomeList[i].name == this.incomeList[j].name){
                            this.incomeList[i].value += this.incomeList[j].value;
                            this.incomeList.splice(j,1);
                        }
                    }
                }

            }
            for (let dataUnit of this.dataRange.dataUnits) {
                    if(dataUnit.outcomeTransaction.length>0){
                        this.outcomeTransaction.push(dataUnit.outcomeTransaction);
                    }               
            }
            for (let dataUnit of this.dataRange.dataUnits) {
                if(dataUnit.incomeTransaction.length>0){
                    this.incomeTransaction.push(dataUnit.incomeTransaction);
                }               
        }
        
        
        
        }
        for(let i = 0; i<this.outcomeList.length; i++){
            let tmp1: TransactionView[][] = [];
            for(let j = 0; j<this.outcomeTransaction.length;j++){
                let tmp2: TransactionView[] = [];
                for(let k = 0; k<this.outcomeTransaction[j].length; k++){
                    if(this.outcomeList[i].name == this.outcomeTransaction[j][k].category.name){                       
                        tmp2.push(this.outcomeTransaction[j][k]);
                    }
                }
                tmp1.push(tmp2);
            }
            this.typeOutcomeTransaction.push(tmp1);
        }
        for(let i = 0; i<this.incomeList.length; i++){
            let tmp1: TransactionView[][] = [];
            for(let j = 0; j<this.incomeTransaction.length;j++){
                let tmp2: TransactionView[] = [];
                for(let k = 0; k<this.incomeTransaction[j].length; k++){
                    if(this.incomeList[i].name == this.incomeTransaction[j][k].category.name){                       
                        tmp2.push(this.incomeTransaction[j][k]);
                    }
                }
                tmp1.push(tmp2);
            }
            this.typeIncomeTransaction.push(tmp1);
        }

        
    }



    onSelect(event: any) {
        console.log(event);
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
            nzComponentParams: {title,startDate,endDate,dataRange,type},
            nzBodyStyle: {
                "padding": "0",
            },
            nzWidth: 500,
            nzFooter: []
        });
    }
    triggerShowPopup2(title: string,startDate: Date, endDate: Date, dataRange: DataRange,type:string, typeTransaction: TransactionView[][][], typeList: DataPoint[]) {
        const modal: NzModalRef = this.modal.create({
            nzTitle: title,
            nzClassName: "debt-transaction-history",
            nzContent: TransactionHistoryPopupComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {title,startDate,endDate,dataRange,type,typeTransaction,typeList},
            nzBodyStyle: {
                "padding": "0",
            },
            nzWidth: 500,
            nzFooter: []
        });
    }
    

    

}

interface DataPoint {
    name: string;
    value: number;
}

