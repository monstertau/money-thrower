import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input() viewMode!: string;
  @Input() transactions!: Transaction[];
  @Output() selectedTransaction = new EventEmitter<Transaction>();
  currentMonth = 'this';
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  selectTransaction(id: string) {
    let transaction = this.transactions.find(transaction => transaction.transactionId === id);
    this.selectedTransaction.emit(transaction);
    let dialog = document.getElementsByClassName('list-transaction') as HTMLCollectionOf<HTMLElement>;
    let dialogDetail = document.getElementById('transaction-detail') as HTMLElement;
    if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
      dialog[0].style.marginLeft = "21%";
      setTimeout(() => {
        dialogDetail.hidden = false;
      }, 500);
    }
  }

}