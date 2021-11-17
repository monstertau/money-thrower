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

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

    add_wallet = true;
    edit_wallet = false;
    add_edit_wallet_dialog = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    back() {
        window.location.href = '/home';
    }

    addWallet() {
        this.add_edit_wallet_dialog = true;
        this.add_wallet = true;
        this.edit_wallet = false;
    }

    editWallet() {
        this.add_edit_wallet_dialog = true;
        this.edit_wallet = true;
        this.add_wallet = false;
    }

    closeAddWallet() {
        this.add_edit_wallet_dialog = false;
    }

}
>>>>>>> a35448f4 (add category component)
