import {NgModule} from '@angular/core';
import {TransactionAddComponent} from "./transaction-add.component";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { TransactionAddCategoryComponent } from './transaction-add-category/transaction-add-category.component';
import { TransactionAddWalletComponent } from './transaction-add-wallet/transaction-add-wallet.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {BrowserModule} from "@angular/platform-browser";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzListModule} from "ng-zorro-antd/list";


@NgModule({
    declarations: [
        TransactionAddComponent,
        TransactionAddCategoryComponent,
        TransactionAddWalletComponent,
    ],
    exports: [
        TransactionAddComponent
    ],
    imports: [
        NzIconModule,
        NzButtonModule,
        NzGridModule,
        NzInputModule,
        FormsModule,
        NzDatePickerModule,
        NzDividerModule,
        BrowserModule,
        NzTabsModule,
        NzListModule
    ]
})
export class TransactionAddModule {
}
