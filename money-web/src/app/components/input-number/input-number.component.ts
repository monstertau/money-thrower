import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Utils} from "../../util/utils";

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {
    @Input() inputName!: string;
    @Input() supportNegative: boolean = false;
    @Input() inputValue: number = 0;
    @Output() inputValueChange = new EventEmitter<number>();
    @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    onChangeAmount(value: string): void {
        let res = value.replace(/\D/g, "");
        if (this.supportNegative) {
            res = value.replace(/[,]/g, "");
        }
        if (res === null || res.length <= 0) {
            this.inputValue = 0;
            this.inputElement!.nativeElement.value = this.getFormatAmount();
            return;
        }
        let numberAmount = parseInt(res);
        if (numberAmount < 999999999999) {
            this.inputValue = numberAmount
        }
        this.inputElement!.nativeElement.value = this.getFormatAmount();
        this.inputValueChange.emit(this.inputValue)
    }

    getFormatAmount(): string {
        return Utils.formatNumber(this.inputValue.toString())
    }

}
