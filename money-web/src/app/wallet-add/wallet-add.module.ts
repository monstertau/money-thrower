import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletAddComponent} from "./wallet-add.component";
import {NzGridModule} from "ng-zorro-antd/grid";
import {InputTextModule} from "../components/input-text/input-text.module";
import {InputNumberModule} from "../components/input-number/input-number.module";
import {InputNavigationModule} from "../components/input-navigation/input-navigation.module";
import {InputIconModule} from "../components/input-icon/input-icon.module";


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
        InputTextModule,
        InputNumberModule,
        InputNavigationModule,
        InputIconModule
    ]
})
export class WalletAddModule { }
