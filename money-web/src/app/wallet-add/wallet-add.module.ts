import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletAddComponent} from "./wallet-add.component";
import {NzGridModule} from "ng-zorro-antd/grid";
import {InputTextModule} from "../components/input-text/input-text.module";


@NgModule({
    declarations: [
        WalletAddComponent,
    ],
    exports: [
        WalletAddComponent
    ],
    imports: [
        CommonModule,
        NzGridModule,
        InputTextModule
    ]
})
export class WalletAddModule { }
