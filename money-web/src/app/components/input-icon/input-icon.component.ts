import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-input-icon',
    templateUrl: './input-icon.component.html',
    styleUrls: ['./input-icon.component.css']
})
export class InputIconComponent implements OnInit {
    @Input() inputIcon: string = "/assets/catalogs/wallet_icon.png";

    constructor() {
    }

    ngOnInit(): void {
    }

}
