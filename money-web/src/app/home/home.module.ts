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
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzImageModule } from 'ng-zorro-antd/image';
import { TopbarTransactionComponent } from './topbar/topbar-transaction/topbar-transaction.component';
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { TransactionAddModule } from "../transaction-add/transaction-add.module";
import { TopbarWalletComponent } from "./topbar/topbar-wallet/topbar-wallet.component";
import { WalletAddModule } from "../wallet-add/wallet-add.module";
import { TopbarCategoryComponent } from './topbar/topbar-category/topbar-category.component';
import { TopbarSearchComponent } from './topbar/topbar-search/topbar-search.component';
import { FormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { InputDaterangeModule } from '../components/input-daterange/input-daterange.module';
import { CategoryModule } from '../category/category.module';
import { InputDateModule } from '../components/input-date/input-date.module';
import { InputNavigationModule } from '../components/input-navigation/input-navigation.module';
import { ComponentsModule } from '../components/components.module';
import { TopbarReportComponent } from './topbar/topbar-report/topbar-report.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TopbarBudgetComponent } from './topbar/topbar-budget/topbar-budget.component';
import { BudgetAddModule } from '../budget-add/budget-add.module';

@NgModule({
    declarations: [
        HomeComponent,
        TopbarComponent,
        SidebarComponent,
        TopbarTransactionComponent,
        TopbarWalletComponent,
        TopbarCategoryComponent,
        TopbarSearchComponent,
        TopbarReportComponent,
        TopbarBudgetComponent
    ],
    imports: [
        NzModalModule,
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        NzLayoutModule,
        NzButtonModule,
        NzIconModule,
        NzToolTipModule,
        NzMenuModule,
        NzDropDownModule,
        NzButtonModule,
        NzDividerModule,
        NzNotificationModule,
        NzImageModule,
        NzGridModule,
        NzListModule,
        NzImageModule,
        NzInputModule,
        NzSliderModule,
        NzInputNumberModule,
        TransactionAddModule,
        WalletAddModule,
        BudgetAddModule,
        InputDaterangeModule,
        CategoryModule,
        NzModalModule,
        ComponentsModule,
        ScrollingModule,
    ],

})
export class HomeModule {
}
