import {Component, OnInit} from '@angular/core';
import {DropDownList} from "../model";

@Component({
    selector: 'app-wallet-add-currency',
    templateUrl: './wallet-add-currency.component.html',
    styleUrls: ['./wallet-add-currency.component.css']
})
export class WalletAddCurrencyComponent implements OnInit {
    currencyInfo!:string;
    fallbackFunc!:Function;
    constructor() {
    }

    ngOnInit(): void {
    }

    CurrencyList = [
        {code: "VND", text: "Việt Nam Đồng", icon_path:"curr_vietnam"},
    ]

}
