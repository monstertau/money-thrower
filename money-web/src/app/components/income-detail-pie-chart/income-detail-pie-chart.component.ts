import {Component, Input, OnInit} from '@angular/core';
import { DataRange } from 'src/app/view-model/data-range';
import {multi} from './data';

@Component({
    selector: 'app-income-detail-pie-chart',
    templateUrl: './income-detail-pie-chart.component.html',
    styleUrls: ['./income-detail-pie-chart.component.css']
})
export class IncomeDetailPieChartComponent implements OnInit {



    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() multi: DataPoint[] = [];
    @Input() view?: any[];
    // options
    colorScheme = {
        domain: ['#005C72', '#66D8E8', '#1DB593', '#74FF91', '#C2DB4F']
    };
    animations: boolean = true;

    constructor() {}

    ngOnInit(): void {
        if (this.dataRange.dataUnits.length) {
            //console.log(this.dataRange.dataUnits)
            for (let dataUnit of this.dataRange.dataUnits) {
                if(dataUnit.incomeList.length>0){
                    for(let i = 0; i< dataUnit.incomeList.length;i++){
                        let dataPoint = {
                            name: dataUnit.incomeList[i].name,
                            value: dataUnit.incomeList[i].value
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
