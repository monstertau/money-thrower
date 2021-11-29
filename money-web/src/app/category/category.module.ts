import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { LoadingSpinner2Component } from '../components/loading-spinner2/loading-spinner2.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CategoryFormComponent } from './category-form/category-form.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryDetailComponent,
    LoadingSpinner2Component,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzImageModule,
    NzSpinModule,
    NzGridModule,
    NzRadioModule,
    FormsModule,
    ComponentsModule
  ]
})

export class CategoryModule { }

