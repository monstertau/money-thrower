import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDaterangeComponent } from './input-daterange.component';
import { CustomDaterangeComponent } from './custom-daterange/custom-daterange.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        InputDaterangeComponent,
        CustomDaterangeComponent
    ],
    imports: [
        CommonModule,
        NzDatePickerModule,
        FormsModule,
    ]
})
export class InputDaterangeModule { }
