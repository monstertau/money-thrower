import {NgModule} from '@angular/core';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {CommonModule} from "@angular/common";
import {InputDateComponent} from "./input-date.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        InputDateComponent,
    ],
    exports: [
        InputDateComponent
    ],

    imports: [
        CommonModule,
        NzDatePickerModule,
        FormsModule
    ]
})
export class InputDateModule {
}
