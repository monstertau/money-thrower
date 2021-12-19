import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {ComponentsModule} from "../components/components.module";



@NgModule({
  declarations: [
    ReportComponent
  ],
    imports: [
        CommonModule,
        NzGridModule,
        NzDividerModule,
        ComponentsModule
    ]
})
export class ReportModule { }
