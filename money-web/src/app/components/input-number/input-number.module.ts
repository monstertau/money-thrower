import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {InputNumberComponent} from "./input-number.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        InputNumberComponent,
    ],
    exports: [
        InputNumberComponent
    ],

    imports: [
        CommonModule,
        NzInputModule,
        FormsModule
    ]
})
export class InputNumberModule {
}
