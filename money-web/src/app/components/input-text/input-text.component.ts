import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
    @Input() inputName!: string;
    @Input() textModel: string = "";
    @Input() placeholder: string = "";
    @Output() textModelChange = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
