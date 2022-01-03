import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {NzModalModule} from "ng-zorro-antd/modal";
import {BudgetRoutingModule} from './budget-routing.module';
import {BudgetComponent} from './budget.component';
import {BudgetDetailComponent} from './budget-detail/budget-detail.component';


@NgModule({
    declarations: [
        BudgetComponent,
        BudgetDetailComponent
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
        BudgetRoutingModule
    ]
})
export class BudgetModule {
}
