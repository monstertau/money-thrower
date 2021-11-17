import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { LoadingSpinner2Component } from '../components/loading-spinner2/loading-spinner2.component';

=======

import { WalletRoutingModule } from './category-routing.module';
import { WalletComponent } from './category.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzImageModule } from 'ng-zorro-antd/image';
import { WalletAddComponent } from './wallet-add/wallet-add.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
>>>>>>> a35448f4 (add category component)
=======
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

>>>>>>> de60674d (reconstruct category component)


@NgModule({
  declarations: [
<<<<<<< HEAD
<<<<<<< HEAD
    CategoryComponent,
    CategoryDetailComponent,
    LoadingSpinner2Component
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzImageModule,
    NzSpinModule
  ]
})
export class CategoryModule { }
=======
    WalletComponent,
    WalletDetailComponent,
    WalletAddComponent,
    LoadingSpinnerComponent
=======
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent,
>>>>>>> de60674d (reconstruct category component)
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule
  ]
})
<<<<<<< HEAD
export class WalletModule { }
>>>>>>> a35448f4 (add category component)
=======
export class CategoryModule { }
>>>>>>> de60674d (reconstruct category component)
