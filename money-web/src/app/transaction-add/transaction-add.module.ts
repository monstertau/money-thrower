import {NgModule} from '@angular/core';
import {TransactionAddComponent} from "./transaction-add.component";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  declarations: [
    TransactionAddComponent,
  ],
  imports: [
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule
  ]
})
export class TransactionAddModule {
}
