import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../view-model/transactions';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private transactionService: TransactionService,
    private commonService: CommonService,) {
      this.commonService.currentViewMode.subscribe(mode => { this.viewMode = mode; });
  }

  viewMode!: string;

  selectedTransaction!: TransactionView;
  selected: boolean = false;

  ngOnInit(): void {
  }

  onTransactionSelected(transaction: TransactionView) {
    this.selectedTransaction = transaction;
    this.selected = true;
  }

  onTransactionDetailClose(closed: boolean) {
    this.selected = closed;
  }

  onMonthChange(month: any) {
    this.commonService.changeMonth(month);
  }
}

