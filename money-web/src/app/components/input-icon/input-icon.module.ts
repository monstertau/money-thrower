import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputIconComponent } from './input-icon.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";



@NgModule({
    declarations: [
        InputIconComponent
    ],
    exports: [
        InputIconComponent
    ],
    imports: [
        CommonModule,
        NzGridModule,
        NzIconModule
    ]
})
export class InputIconModule { }
