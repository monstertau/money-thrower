import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzImageModule } from 'ng-zorro-antd/image';
import { WalletAddComponent } from './wallet-add/wallet-add.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";


@NgModule({
  declarations: [
    WalletComponent,
    WalletDetailComponent,
    WalletAddComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzSelectModule,
    NzImageModule
  ]
})
export class WalletModule { }
