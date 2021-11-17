import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class CategoryModule { }
