import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
    declarations: [
        SearchComponent,
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,

        NzImageModule,
        NzDividerModule
    ]
})
export class SearchModule { }
