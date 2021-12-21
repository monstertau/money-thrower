import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

export type DateOption = {
    title: string,
    startDate: Date,
    endDate: Date,
}

@Component({
    selector: 'app-date-select',
    templateUrl: './date-select.component.html',
    styleUrls: ['./date-select.component.css']
})
export class DateSelectComponent implements OnInit {
    @Input()
    dateRange: DateOption = {
        title: "",
        startDate: new Date(),
        endDate: new Date()
    };

    @Output()
    dateRangeChange = new EventEmitter<DateOption>();

    @Output()
    onCancel = new EventEmitter();

    selectedOptionIndex = - 1;

    get showDateRangeInput() { return this.dateRange.title == "Custom" };

    customStartDate = null;

    customEndDate = null;

    date = new Date();
    y = this.date.getFullYear();
    m = this.date.getMonth();
    d = this.date.getDate();

    dateOptions = [
        {
            title: "This month",
            startDate: new Date(this.y, this.m, 1),
            endDate: new Date(),
        },
        {
            title: "Last month",
            startDate: new Date(this.y, this.m - 1, 1),
            endDate: new Date(this.y, this.m, 0),
        },
        {
            title: "Last 3 months",
            startDate: new Date(this.y, this.m - 3, this.d),
            endDate: new Date(),
        },
        {
            title: "Last 6 months",
            startDate: new Date(this.y, this.m - 6, this.d),
            endDate: new Date(),
        },
        {
            title: "This year",
            startDate: new Date(this.y, 0, 1),
            endDate: new Date(),
        },
        {
            title: "Last year",
            startDate: new Date(this.y - 1, 0, 1),
            endDate: new Date(this.y - 1, 11, 31),
        },
        {
            title: "Custom",
            startDate: new Date(),
            endDate: new Date(),
        }
    ]


    constructor(public cd: ChangeDetectorRef) {
        // this.cd.detach();
    }

    ngOnInit(): void {
    }

    onItemSelected(option: DateOption, index: number) {
        this.selectedOptionIndex = index;

        if (option.title == "Custom") {
            this.dateRange = {...this.dateRange, title: option.title}
            this.cd.detectChanges();
        } else {
            this.dateRange = option;
        }

        console.log(this.dateRange);
    }

    applyClick() {
        console.log(this.dateRange)
        this.dateRangeChange.emit(this.dateRange);
    }
}
