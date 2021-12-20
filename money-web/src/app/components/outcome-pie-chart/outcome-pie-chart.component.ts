import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';

@Component({
    selector: 'app-outcome-pie-chart',
    templateUrl: './outcome-pie-chart.component.html',
    styleUrls: ['./outcome-pie-chart.component.css']
})
export class OutcomePieChartComponent implements OnInit {


    ngOnInit(): void {
    }


    multi!: any[];
    @Input() view?: any[];
    // options
    animations: boolean = true;
    colorScheme = {
        domain: ['#597C2B', '#668D2E', '#80A142', '#91B247', '#D2E459']
      };
    constructor() {
        Object.assign(this, {multi})
    }


}
