import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TransactionComponent } from './transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';



@NgModule({
  declarations: [
    TransactionComponent,
    TransactionListComponent,
    TransactionDetailComponent,
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class TransactionModule { }
