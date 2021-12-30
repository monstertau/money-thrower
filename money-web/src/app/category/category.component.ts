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


  },
  (err) => {
      console.log(err)
  });
  
  }
  back(){
    window.location.href = '/home';
  }

}


