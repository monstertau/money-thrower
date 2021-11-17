<<<<<<< HEAD
<<<<<<< HEAD
import { Component,Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService } from '../services/category.service';
import { Category, categoryType, CategoryView } from '../view-model/category';
import { Utils } from '../util/utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isLoading: boolean = true;
  categories: CategoryView[] = [];
  selectedCategory!: CategoryView;
  selected: boolean = false;
  
  @Input() callbackFunc!: Function;
  

  

  constructor(private categoryService: CategoryService,private commonService: CommonService,) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res) => {
      res.forEach(element => {
          let categoryView = new CategoryView().addCategory(element)
          this.categories.push(categoryView);
      });
      console.log(this.categories);


  },
  (err) => {
      console.log(err)
  });
  
  }
  back(){
    window.location.href = '/home';
  }

}


=======
import {Component, OnInit} from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService, Category } from '../services/category.service';
>>>>>>> de60674d (reconstruct category component)

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
<<<<<<< HEAD
>>>>>>> a35448f4 (add category component)
=======

>>>>>>> de60674d (reconstruct category component)
