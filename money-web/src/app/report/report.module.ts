import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';



@NgModule({
  declarations: [
    ReportComponent,
    ReportDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }
