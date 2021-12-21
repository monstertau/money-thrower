import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import * as moment from 'moment';
import { DateOption } from 'src/app/components/date-select/date-select.component';

@Component({
    selector: 'app-topbar-report',
    templateUrl: './topbar-report.component.html',
    styleUrls: ['./topbar-report.component.css']
})
export class TopbarReportComponent implements OnInit {

    constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

    showDateRangeSelect = false;

    selectedDateRange = {
        title: "Today",
        startDate: new Date(),
        endDate: new Date()
    };

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.selectedDateRange = {
                title: params.title,
                startDate: moment(params.startDate, "DD/MM/YYYY").toDate(),
                endDate: moment(params.endDate, "DD/MM/YYYY").toDate()
            }
        });
    }

    openDateRangePopup() {
        this.showDateRangeSelect = true;
    }

    onDateRangeSelected(newDateRange: DateOption) {
        this.selectedDateRange = newDateRange;
        this.showDateRangeSelect = false;

        this.router.navigate([],
            {
                relativeTo: this.activatedRoute,
                queryParams: {
                    title: newDateRange.title,
                    startDate: moment(newDateRange.startDate).format("DD/MM/YYYY"),
                    endDate: moment(newDateRange.endDate).format("DD/MM/YYYY")
                },
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }
}
