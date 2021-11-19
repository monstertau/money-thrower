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
import { NzImageModule } from 'ng-zorro-antd/image';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzModalModule } from "ng-zorro-antd/modal";
import { TopbarTransactionComponent } from './topbar/topbar-transaction/topbar-transaction.component';
import { TopbarWalletComponent } from './topbar/topbar-wallet/topbar-wallet.component';


@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    TopbarTransactionComponent,
    TopbarWalletComponent
  ],
  imports: [
    NzModalModule,
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
    NzImageModule
  ],

})
export class HomeModule { }
