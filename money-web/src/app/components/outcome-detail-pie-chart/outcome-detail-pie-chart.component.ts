import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';
import { TransactionService, Transaction2, TransactionFilter } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../../view-model/transactions';
import { CategoryService } from '../../services/category.service';
import { WalletService } from '../../services/wallet.service';
import {DataRange, DataUnit} from "../../view-model/data-range";
import * as moment from "moment";



@Component({
    selector: 'app-outcome-detail-pie-chart',
    templateUrl: './outcome-detail-pie-chart.component.html',
    styleUrls: ['./outcome-detail-pie-chart.component.css']
})
export class OutcomeDetailPieChartComponent implements OnInit {

    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() multi: DataPoint[] = [];
    @Input() view?: any[];
    // options
    animations: boolean = true;
    colorScheme = {
        domain: ['#597C2B', '#668D2E', '#80A142', '#91B247', '#D2E459']
      };

    

    constructor() {}

    ngOnInit(): void {
        //console.log(this.dataRange)
        if (this.dataRange.dataUnits.length) {
            //console.log(this.dataRange.dataUnits)
            for (let dataUnit of this.dataRange.dataUnits) {
                if(dataUnit.outcomeList.length>0){
                    for(let i = 0; i< dataUnit.outcomeList.length;i++){
                        let dataPoint = {
                            name: dataUnit.outcomeList[i].name,
                            value: dataUnit.outcomeList[i].value
                        }
                        this.multi.push(dataPoint);
                        
                    }
                    
                }
                
            for (let i = 0; i<this.multi.length;i++){
                for(let j = i+1;j<this.multi.length;j++){
                    if(this.multi[i].name == this.multi[j].name){
                        this.multi[i].value += this.multi[j].value;
                        this.multi.splice(j,1);
                    }
                }
            }
                
                
            }
            //console.log(this.multi);
            
        }
    }



    onSelect(event: any) {
        console.log(event);
    }

    

}

interface DataPoint {
    name: string;
    value: number;
}

