import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  @Input() transaction!: Transaction;
  @Output() closed = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeDetail() {
    this.closed.emit(true);
    let dialog = document.getElementById('transaction-detail') as HTMLElement;
    dialog.hidden = true;
    let dialogList = document.getElementsByClassName('list-transaction') as HTMLCollectionOf<HTMLElement>;
    if (dialogList.length > 0) {
      dialogList[0].style.marginLeft = '50%';
    }
  }

}
