import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {
    @Input() inputName!: string;
    @Input() inputFormat: string = "dd/MM/yyyy";
    @Input() transactionDate: Date = new Date();
    @Output() transactionDateChange = new EventEmitter<Date>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
