// @ts-ignore

import {Component, OnInit} from '@angular/core';
import * as am5 from "@amcharts/amcharts5";

@Component({
    selector: 'app-report-detail',
    templateUrl: './report-detail.component.html',
    styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

    constructor() {
    }

    root = am5.Root.new("chartdiv");



    ngOnInit(): void {
    }


}
