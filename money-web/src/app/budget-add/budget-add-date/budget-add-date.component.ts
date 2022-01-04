import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomDaterangeComponent } from 'src/app/components/input-daterange/custom-daterange/custom-daterange.component';

@Component({
    selector: 'app-budget-add-date',
    templateUrl: './budget-add-date.component.html',
    styleUrls: ['./budget-add-date.component.css']
})
export class BudgetAddDateComponent implements OnInit {

    @Input() currentMonth!: number;
    @Input() currentYear!: number;
    @Input() callbackFunc!: Function;

    selectedRange: string = '';
    customRange: Date[] = [];

    @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
    }

    getThisWeek(): string {
        var date = new Date();
        date.setDate(date.getDate() + 6);
        let today = new Date();
        let week = this.formatDateString(today.toLocaleDateString()) + ' - ' + this.formatDateString(date.toLocaleDateString());
        return week;
    }

    getNextMonths(x: number): string {
        let d = new Date(`${this.currentYear}/${this.currentMonth}/01`);
        d.setMonth(d.getMonth() + x);
        let el = d.toLocaleDateString().split('/');
        if (parseInt(el[1]) < 10) {
            el[1] = '0' + el[1];
        }
        if (parseInt(el[0]) < 10) {
            el[0] = '0' + el[0];
        }
        let dateNum = new Date(parseInt(el[2]), parseInt(el[0]), 0).getDate();
        return `01/${this.currentMonth}/${this.currentYear} - ${dateNum}/${el[0]}/${el[2]}`;
    }

    getCurrentQuarter(current: number): string {
        let quarters = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
        let result = '';
        quarters.forEach(element => {
            if (element.includes(current)) {
                let dateNum = new Date(this.currentYear, element[2], 0).getDate();
                let start = '';
                let end = '';
                if (element[0] < 10) {
                    start = '0' + element[0];
                } else start = element[0].toString();
                if (element[2] < 10) {
                    end = '0' + element[2];
                } else end = element[2].toString();
                result = `01/${start}/${this.currentYear} - ${dateNum}/${end}/${this.currentYear}`;
            }
        });
        return result;
    }

    getNextQuarter(current: number): string {
        let quarters = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
        let result = '';
        for (let i = 0; i < quarters.length; i++) {
            if (quarters[i].includes(current)) {
                let dateNum = 0;
                if (i == 3) {
                    dateNum = new Date(this.currentYear + 1, quarters[0][2], 0).getDate();
                    result = `01/01/${this.currentYear} - ${dateNum}/03/${this.currentYear}`;
                } else {
                    dateNum = new Date(this.currentYear, quarters[i + 1][2], 0).getDate();
                    let start = '';
                    let end = '';
                    if (quarters[i + 1][0] < 10) {
                        start = '0' + quarters[i + 1][0];
                    } else start = quarters[i + 1][0].toString();
                    if (quarters[i + 1][2] < 10) {
                        end = '0' + quarters[i + 1][2];
                    } else end = quarters[i + 1][2].toString();
                    result = `01/${start}/${this.currentYear} - ${dateNum}/${end}/${this.currentYear}`;
                }
            }
        }
        return result;
    }

    getThisYear(): string {
        return `01/01/${this.currentYear} - 31/12/${this.currentYear}`;
    }

    getNextYear(): string {
        return `01/01/${this.currentYear + 1} - 31/12/${this.currentYear + 1}`;
    }

    getSelectedRange(): string {
        return this.selectedRange;
    }

    onAddCustomRange() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Time Range',
            nzClassName: "add-custom-range-modal",
            nzContent: CustomDaterangeComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                callbackFunc: () => {
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: [{
                label: 'OK',
                onClick: () => {
                    modal.destroy();
                }
            }]
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            this.customRange = instance.getResult();
            let start = this.customRange[0].toLocaleDateString();
            let el1 = start.split('/');
            if (parseInt(el1[1]) < 10) {
                el1[1] = '0' + el1[1];
            }
            let startString = `${el1[1]}/${el1[0]}/${el1[2]}`;
            let end = this.customRange[1].toLocaleDateString();
            let el2 = end.split('/');
            if (parseInt(el2[1]) < 10) {
                el2[1] = '0' + el2[1];
            }
            let endString = `${el2[1]}/${el2[0]}/${el2[2]}`;
            this.selectedRange = `${startString} - ${endString}`;
            this.callbackFunc();
        });
    }

    onRangeSelected(range: string) {
        this.selectedRange = range;
        this.callbackFunc();
    }

    formatDateString(date: string) {
        let el = date.split('/');
        if (parseInt(el[1]) < 10) {
            el[1] = '0' + el[1];
        }
        if (parseInt(el[0]) < 10) {
            el[0] = '0' + el[0];
        }
        return el[1] + '/' + el[0] + '/' + el[2];
    }

}
