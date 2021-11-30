import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomDaterangeComponent } from './custom-daterange/custom-daterange.component';

@Component({
    selector: 'app-input-daterange',
    templateUrl: './input-daterange.component.html',
    styleUrls: ['./input-daterange.component.css']
})
export class InputDaterangeComponent implements OnInit {
    @Input() currentMonth!: number;
    @Input() currentYear!: number;
    @Input() callbackFunc!: Function;

    selectedRange: string = '';
    customRange: Date[] = [];

    @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
    }

    getLastMonth(): string {
        let month: number = 0;
        let year: number = 0;
        if (this.currentMonth === 1) {
            month = 12;
            year = this.currentYear - 1;
        } else { month = this.currentMonth - 1; year = this.currentYear; }
        let datenum = new Date(year, month, 0).getDate();
        return `01/${month}/${year} - ${datenum}/${month}/${year}`;
    }

    getLastMonths(x: number): string {
        let d = new Date(`${this.currentYear}/${this.currentMonth}/01`);
        let dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();
        d.setMonth(d.getMonth() - x);
        let el = d.toLocaleDateString().split('/');
        if (parseInt(el[1]) < 10) {
            el[1] = '0' + el[1];
        }
        return `${el[1]}/${el[0]}/${el[2]} - ${dateNum}/${this.currentMonth}/${this.currentYear}`;
    }

    getLastYears(x: number): string {
        return `01/01/${this.currentYear - x} - 31/12/${this.currentYear - x}`;
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

}
