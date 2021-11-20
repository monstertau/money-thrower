import {NgModule} from '@angular/core';
import {InputTextComponent} from "./input-text.component";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
    declarations: [
        InputTextComponent,
    ],
    exports: [
        InputTextComponent
    ],

    imports: [
        FormsModule,
        NzInputModule
    ]
})
export class InputTextModule {
}
