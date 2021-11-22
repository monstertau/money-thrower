import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService, Category } from '../services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private commonService: CommonService,) {
      this.commonService.currentViewMode.subscribe(mode => { this.viewMode = mode; });
  }
  sampleCategories: Category[] = [
    {
      categoryId: "1",
      userId: "1",
      is_expense:true,
      categoryName: "cate1",
      catId: "1",
      type: 1,
      icon: "1"
    }
  ];

  viewMode!: string;

  selectedCategory!: Category;
  selected: boolean = false;

  ngOnInit(): void {
  }

  onCategorySelected(category: Category) {
    this.selectedCategory = category;
    this.selected = true;
  }

  onCategoryDetailClose(closed: boolean) {
    this.selected = closed;
  }

}

