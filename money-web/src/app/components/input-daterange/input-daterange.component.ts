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

    @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
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
        return `01/01/${this.currentYear-x} - 31/12/${this.currentYear-x}`;
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
            nzFooter: []
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            console.log(instance.getResult())
        });
    }

    onRangeSelected(range: string) {
        this.selectedRange = range;
        this.callbackFunc();
    }

}
