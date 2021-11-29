import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PopupSelectCategoryComponent } from './popup-select-category/popup-select-category.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { PopupSelectIconComponent } from './popup-select-icon/popup-select-icon.component';

@NgModule({
    declarations: [
        // LoadingSpinnerComponent,
        PopupSelectCategoryComponent,
        PopupSelectIconComponent
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
        FormsModule
    ],
    exports: [
        PopupSelectCategoryComponent,
        PopupSelectIconComponent
    ]
})
export class ComponentsModule { }
