import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/services/category.service';
import { Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category!: Category;
  @Output() closed = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeDetail() {
    this.closed.emit(true);
    let dialog = document.getElementById('category-detail') as HTMLElement;
    dialog.hidden = true;
    let dialogList = document.getElementsByClassName('list-category') as HTMLCollectionOf<HTMLElement>;
    if (dialogList.length > 0) {
      dialogList[0].style.marginLeft = '50%';
    }
  }

}
