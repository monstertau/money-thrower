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
    selector: 'app-outcome-pie-chart',
    templateUrl: './outcome-pie-chart.component.html',
    styleUrls: ['./outcome-pie-chart.component.css']
})
export class OutcomePieChartComponent implements OnInit {

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
        // if (this.dataRange.dataUnits.length) {
        //     for (let dataUnit of this.dataRange.dataUnits) {
        //         let outcome = 0;
        //         for (let outcomeTrans of dataUnit.outcomeTransaction) {
        //             outcome += outcomeTrans.amount
        //         }
        //         let dataPoint = {
        //             name: dataUnit.name,
        //             value: outcome
        //         }
        //         this.multi.push(dataPoint)
        //     }
        //     console.log(this.multi);
        // }
    }



    onSelect(event: any) {
        console.log(event);
    }

    

}

interface DataPoint {
    name: string;
    value: number;
}

