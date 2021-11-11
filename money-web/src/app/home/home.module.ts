import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';



@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    TransactionComponent,
    TransactionListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzDividerModule,
    NzTabsModule
  ]
})
export class HomeModule { }
