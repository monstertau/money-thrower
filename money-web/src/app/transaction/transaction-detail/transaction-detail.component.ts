import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction2 } from 'src/app/services/transaction.service';
import { Utils } from 'src/app/util/utils';
import { TransactionView } from 'src/app/view-model/transactions';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  @Input() transaction!: TransactionView;
  @Output() closed = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.transaction.transactionDate);
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

  getDate(date: string) {
    return Utils.getDate(date);
  }

  getFormatBalance(balance: number) {
    return Utils.formatCurrency(balance);
  }

}
