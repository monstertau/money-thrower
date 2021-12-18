import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";



@NgModule({
  declarations: [
    ReportComponent
  ],
    imports: [
        CommonModule,
        NzGridModule,
        NzDividerModule
    ]
})
export class ReportModule { }
