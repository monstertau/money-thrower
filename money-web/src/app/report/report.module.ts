import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {ComponentsModule} from "../components/components.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import { ReportDetailComponent } from './report-detail/report-detail.component';
import {NzSpinModule} from "ng-zorro-antd/spin";
import { OutcomeDetailComponent } from './outcome-detail/outcome-detail.component';
import { IncomeDetailComponent } from './income-detail/income-detail.component';



@NgModule({
  declarations: [
    ReportComponent,
    ReportDetailComponent,
    OutcomeDetailComponent,
    IncomeDetailComponent
  ],
    imports: [
        CommonModule,
        NzGridModule,
        NzDividerModule,
        ComponentsModule,
        NzIconModule,
        NzModalModule,
        NzSpinModule
    ]
})
export class ReportModule { }
