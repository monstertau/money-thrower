import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TransactionComponent } from './transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {TransactionAddModule} from "../transaction-add/transaction-add.module";


@NgModule({
    declarations: [
        TransactionComponent,
        TransactionListComponent,
        TransactionDetailComponent,
    ],
    exports: [
        TransactionListComponent
    ],
    imports: [
        CommonModule,
        NzTabsModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        NzImageModule,
        NzModalModule,
        NzSpinModule,
        TransactionAddModule
    ]
})
export class TransactionModule { }
