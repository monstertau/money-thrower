import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';
import {parse} from "@angular/compiler/src/render3/view/style_parser";

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {


    ngOnInit(): void {
    }


    @Input() multi!: any[];
    @Input() view?: any[];
    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    animations: boolean = true;
    colorScheme = {
        domain: ['#22a1d3', '#f25a5a', '#AAAAAA']
    };
    yAxisTick: number[] = []
    xAxisTick: number[] = []

    constructor() {
        Object.assign(this, {multi})
        this.addYAxisTick()
        this.addXAxisTick()
    }

    addYAxisTick() {
        let maxAmount = 10000;
        let minAmount = -10000;
        multi.forEach(function (item) {
            for (let i = 0; i < item.series.length; i++) {
                if (item.series[i].value > maxAmount) {
                    maxAmount = item.series[i].value
                }
                if (item.series[i].value < minAmount) {
                    minAmount = item.series[i].value
                }
            }
        })
        const lowerBatch = (0 - minAmount) / 2
        const upperBatch = maxAmount / 3
        console.log(maxAmount)
        for (let i = 0; i < 2; i++) {
            const data = minAmount + lowerBatch * i
            if (this.normalizeLabelNumber(data) > maxAmount / 2) {
                this.yAxisTick.push(this.normalizeLabelNumber(data))
            }
        }
        this.yAxisTick.push(0)
        for (let i = 2; i >= 0; i--) {
            this.yAxisTick.push(this.normalizeLabelNumber(maxAmount - upperBatch * i))
        }
    }

    addXAxisTick() {
        let maxRange = 1;
        let minRange = 1;
        multi.forEach(function (item) {
            let data = item.name
            if (data > maxRange) {
                maxRange = data
            }
            if (data < minRange) {
                minRange = data
            }
        })
        const interval = maxRange - minRange
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
            if (absAmount <= item) {
                console.log("abs" + absAmount)
                console.log(item)
            }
            return absAmount <= item
        })
        if (gotAmount === undefined) {
            return amount
        }
        return amount > 0 ? gotAmount : -gotAmount
    }

    onSelect(event: any) {
        console.log(event);
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

    axisFormat(val: any) {
        return (val % 2) === 0 ? val : '';
        // return val
    }

}
