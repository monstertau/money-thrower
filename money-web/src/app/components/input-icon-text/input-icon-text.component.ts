import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-input-icon-text',
    templateUrl: './input-icon-text.component.html',
    styleUrls: ['./input-icon-text.component.css']
})
export class InputIconTextComponent implements OnInit {

    @Input() inputName!: string;
    @Input() textModel: string = "";
    @Input() placeholder: string = "";
    @Input() icon: string = "/assets/catalogs/null.png";
    @Output() textModelChange = new EventEmitter<string>();
    @Output() iconClick = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    onChangeText(text:string){
        this.textModelChange.emit(text)
    }

    onIconClick() {
        this.iconClick.emit();
    }
}
