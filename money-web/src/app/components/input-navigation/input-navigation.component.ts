import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-input-navigation',
    templateUrl: './input-navigation.component.html',
    styleUrls: ['./input-navigation.component.css']
})
export class InputNavigationComponent implements OnInit {
    @Input() inputName!: string;
    @Input() inputIcon?: string;
    @Input() hasChosen: boolean = true;
    @Input() placeholder:string = "";
    @Input() navigationName!: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
