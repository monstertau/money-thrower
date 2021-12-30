import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {PopupSelectCategoryComponent} from './popup-select-category/popup-select-category.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {PopupSelectIconComponent} from './popup-select-icon/popup-select-icon.component';
import {InputIconTextComponent} from './input-icon-text/input-icon-text.component';
import {InputDateModule} from './input-date/input-date.module';
import {InputIconModule} from './input-icon/input-icon.module';
import {InputTextModule} from './input-text/input-text.module';
import {InputNumberModule} from './input-number/input-number.module';
import {StackedBarChartComponent} from './stacked-bar-chart/stacked-bar-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {DateSelectComponent} from './date-select/date-select.component';
import {TransactionHistoryPopupComponent} from './transaction-history-popup/transaction-history-popup.component';
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {TransactionModule} from "../transaction/transaction.module";
import { IncomePieChartComponent } from './income-pie-chart/income-pie-chart.component';
import { OutcomePieChartComponent } from './outcome-pie-chart/outcome-pie-chart.component';
import { OutcomeDetailPieChartComponent } from './outcome-detail-pie-chart/outcome-detail-pie-chart.component';
import { IncomeDetailPieChartComponent } from './income-detail-pie-chart/income-detail-pie-chart.component';
import { ReportDetailTransactionComponent } from './report-detail-transaction/report-detail-transaction.component';


@NgModule({
    declarations: [
        // LoadingSpinnerComponent,
        PopupSelectCategoryComponent,
        PopupSelectIconComponent,
        InputIconTextComponent,
        StackedBarChartComponent,
        IncomePieChartComponent,
        OutcomePieChartComponent,
        DateSelectComponent,
        TransactionHistoryPopupComponent,
        OutcomeDetailPieChartComponent,
        IncomeDetailPieChartComponent,
        ReportDetailTransactionComponent
    ],
    imports: [
        CommonModule,
        NzLayoutModule,
        NzIconModule,
        NzToolTipModule,
        NzMenuModule,
        NzDropDownModule,
        NzButtonModule,
        NzDividerModule,
        NzModalModule,
        NzIconModule,
        NzButtonModule,
        NzGridModule,
        NzInputModule,
        NzDividerModule,
        NzTabsModule,
        NzListModule,
        NzInputModule,
        FormsModule,
        InputDateModule,
        InputIconModule,
        InputTextModule,
        InputNumberModule,
        NgxChartsModule,
        NzEmptyModule,
        TransactionModule
    ],
    exports: [
        PopupSelectCategoryComponent,
        PopupSelectIconComponent,
        InputIconTextComponent,
        StackedBarChartComponent,
        DateSelectComponent,
        TransactionHistoryPopupComponent,
        IncomePieChartComponent,
        OutcomePieChartComponent,
        OutcomeDetailPieChartComponent,
        IncomeDetailPieChartComponent,
        ReportDetailTransactionComponent
    ]
})
export class ComponentsModule {
}
