import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FwpRountingModule } from './fwp-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FwpComponent } from './fwp.component';


@NgModule({
  declarations: [
    FwpComponent
  ],
  imports: [
    CommonModule,
    FwpRountingModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzTypographyModule,
    NzInputModule,
    NzNotificationModule,
    NzSpinModule
  ],
  exports: [
    FwpComponent
  ]
})
export class FwpModule { }
