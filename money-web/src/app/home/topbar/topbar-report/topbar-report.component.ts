import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DateOption} from 'src/app/components/date-select/date-select.component';
import {Utils} from "../../../util/utils";

@Component({
    selector: 'app-topbar-report',
    templateUrl: './topbar-report.component.html',
    styleUrls: ['./topbar-report.component.css']
})
export class TopbarReportComponent implements OnInit, OnDestroy {

    constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    }

    showDateRangeSelect = false;

    selectedDateRange: DateRange = {
        title: "Today",
        startDate: new Date(),
        endDate: new Date()
    };

    destroy$ = new Subject();

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: Params) => {

                this.selectedDateRange = {
                    title: params.title,
                    startDate: moment(params.startDate, "DD/MM/YYYY").toDate(),
                    endDate: moment(params.endDate, "DD/MM/YYYY").toDate()
                }

                if (isNaN(this.selectedDateRange.startDate.getTime())
                    || isNaN(this.selectedDateRange.endDate.getTime())) {
                    let date = new Date();

                    this.router.navigate([],
                        {
                            relativeTo: this.activatedRoute,
                            queryParams: {
                                title: "This month",
                                startDate: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format("DD/MM/YYYY"),
                                endDate: moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format("DD/MM/YYYY"),
                            },
                            queryParamsHandling: 'merge', // remove to replace all query params by provided
                        });
                }
                this.selectedDateRange.title = Utils.getDateRangeTitle(this.selectedDateRange.startDate, this.selectedDateRange.endDate);
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

    onDateRangeSelectCanceled() {
        this.showDateRangeSelect = false;
    }

    onSearchClick() {
        // this.router.navigate(["/search"], {queryParams: {}});
        window.location.href = '/search';
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

export type DateRange = {
    title: string;
    startDate: Date;
    endDate: Date;
}
