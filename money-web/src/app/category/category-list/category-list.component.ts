import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @Input() viewMode!: string;
  @Input() categories!: Category[];
  @Output() selectedCategory = new EventEmitter<Category>();
  currentMonth = 'this';
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  selectCategory(id: string) {
    let category = this.categories.find(category => category.categoryId === id);
    this.selectedCategory.emit(category);
    let dialog = document.getElementsByClassName('list-category') as HTMLCollectionOf<HTMLElement>;
    let dialogDetail = document.getElementById('category-detail') as HTMLElement;
    if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
      dialog[0].style.marginLeft = "21%";
      setTimeout(() => {
        dialogDetail.hidden = false;
      }, 500);
    }
  }

}
