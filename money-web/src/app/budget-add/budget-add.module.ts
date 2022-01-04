import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetAddWalletComponent } from './budget-add-wallet/budget-add-wallet.component';
import { BudgetAddCategoryComponent } from './budget-add-category/budget-add-category.component';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzGridModule} from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { BudgetAddComponent } from './budget-add.component';
import { InputNavigationModule } from '../components/input-navigation/input-navigation.module';
import { InputTextModule } from '../components/input-text/input-text.module';
import { InputDateModule } from '../components/input-date/input-date.module';
import { InputNumberModule } from '../components/input-number/input-number.module';
import { InputDaterangeModule } from '../components/input-daterange/input-daterange.module';
import { BudgetAddDateComponent } from './budget-add-date/budget-add-date.component';



@NgModule({
    declarations: [
        BudgetAddWalletComponent,
        BudgetAddCategoryComponent,
        BudgetAddComponent,
        BudgetAddDateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputNavigationModule,
        InputTextModule,
        InputDateModule,
        InputNumberModule,
        InputDaterangeModule,

        NzTabsModule,
        NzInputModule,
        NzGridModule,
    ],
    exports: [
        BudgetAddComponent
    ]
})
export class BudgetAddModule { }
