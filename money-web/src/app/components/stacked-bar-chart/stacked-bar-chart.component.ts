import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {


    ngOnInit(): void {
    }


    multi!: any[];
    @Input() view?: any[];
    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    animations: boolean = true;
    colorScheme = {
        domain: ['#22a1d3', '#f25a5a', '#AAAAAA']
    };

    constructor() {
        Object.assign(this, {multi})
    }

    onSelect(event: any) {
        console.log(event);
    }

    abbreviateNumber(num: number) {
        const lookup = [
            {value: 1, symbol: ""},
            {value: 1e3, symbol: "k"},
            {value: 1e6, symbol: "M"},
            {value: 1e9, symbol: "G"},
            {value: 1e12, symbol: "T"},
            {value: 1e15, symbol: "P"},
            {value: 1e18, symbol: "E"}
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(0).replace(rx, "$1") + item.symbol : "0";
    }

    tickCounter: number = 0;
    tickInterval: number = 4;

    axisFormat(val: any) {
        return (val % 2) === 0 ? val : '';
        // return val
    }

}
