import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-spinner2',
    templateUrl: './loading-spinner2.component.html',
    styleUrls: ['./loading-spinner2.component.css']
})
export class LoadingSpinner2Component implements OnInit {

    @Input()
    isSmall: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
