import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';

@Component({
    selector: 'app-income-pie-chart',
    templateUrl: './income-pie-chart.component.html',
    styleUrls: ['./income-pie-chart.component.css']
})
export class IncomePieChartComponent implements OnInit {


    ngOnInit(): void {
    }


    multi!: any[];
    @Input() view?: any[];
    // options

    animations: boolean = true;

    constructor() {
        Object.assign(this, {multi})
    }

    onSelect(event: any) {
        console.log(event);
    }

    
}
