import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {TransactionView} from "../../view-model/transactions";
import * as moment from "moment";
import {DataRange, DataUnit} from "../../view-model/data-range";
import {out} from "@amcharts/amcharts5/.internal/core/util/Ease";

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {
    @Input() dataRange!: DataRange;
    @Input() startDate!: Date;
    @Input() endDate!: Date;
    @Input() multi: DataPoint[] = [];
    @Input() view?: any[];
    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    animations: boolean = true;
    colorScheme = {
        domain: ['#22a1d3', '#f25a5a', '#AAAAAA']
    };
    xAxisTick: number[] = []

    constructor() {
        this.addXAxisTick()
    }

    ngOnInit(): void {
        if (this.dataRange.dataUnits.length) {
            for (let dataUnit of this.dataRange.dataUnits) {
                let income = 0;
                let outcome = 0;
                for (let incomeTrans of dataUnit.incomeTransaction) {
                    income += incomeTrans.amount
                }
                for (let outcomeTrans of dataUnit.outcomeTransaction) {
                    outcome += outcomeTrans.amount
                }
                let dataPoint = {
                    name: dataUnit.name,
                    series: [
                        {
                            name: "income",
                            value: income,
                        },
                        {
                            name: "outcome",
                            value: -outcome
                        }
                    ]
                }
                this.multi.push(dataPoint)
            }
            //console.log(this.multi);
            this.addXAxisTick()
        }
    }

    addXAxisTick() {
        if (this.multi.length == 0) {
            return;
        }
        let maxRange = parseInt(this.multi[0].name);
        let minRange = parseInt(this.multi[0].name);
        this.multi.forEach(function (item) {
            let data = parseInt(item.name)
            if (data > maxRange) {
                maxRange = data
            }
            if (data < minRange) {
                minRange = data
            }
        })
        const interval = maxRange - minRange;
        //console.log(interval);
        if (interval < 15) {
            for (let i = 0; i <= interval; i++) {
                this.xAxisTick.push(minRange + i)
            }
        } else {
            for (let i = 0; i <= interval; i += 2) {
                this.xAxisTick.push(minRange + i)
            }
        }
    }

    normalizeLabelNumber(amount: number) {
        const absAmount = Math.abs(amount)

        const tickAmount = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000,
            5000000, 10000000, 20000000,
            50000000, 100000000, 20000000, 500000000, 1000000000, 2000000000, 5000000000]
        const gotAmount = tickAmount.find(function (item) {
            return absAmount <= item
        })
        if (gotAmount === undefined) {
            return amount
        }
        return amount > 0 ? gotAmount : -gotAmount
    }

    onSelect(event: any) {
        //console.log(event);
    }

    abbreviateNumber(num: number) {
        const absNum = Math.abs(num)
        const lookup = [
            {value: 1, symbol: ""},
            {value: 1e3, symbol: "K"},
            {value: 1e6, symbol: "M"},
            {value: 1e9, symbol: "G"},
            {value: 1e12, symbol: "T"},
            {value: 1e15, symbol: "P"},
            {value: 1e18, symbol: "E"}
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return absNum >= item.value;
        });
        return item ? (num / item.value).toFixed(0).replace(rx, "$1") + item.symbol : "0";
        // return
    }


}

interface SeriesPoint {
    name: string;
    value: number;
}

interface DataPoint {
    name: string;
    series: SeriesPoint[];
}
