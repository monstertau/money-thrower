import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction2 } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';

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
  sampleTransactions: Transaction2[] = [
    {
      transactionId: "1",
      catId: "1",
      userId: "1",
      note: "Some note",
      walletId: "1",
      transactionDate: "2021-11-11",
      amount: 100,
    },
    {
      transactionId: "2",
      catId: "1",
      userId: "1",
      note: "",
      walletId: "1",
      transactionDate: "2021-11-11",
      amount: 200,
    },
    {
      transactionId: "3",
      catId: "1",
      userId: "1",
      note: "Boring note",
      walletId: "1",
      transactionDate: "2021-11-11",
      amount: 300,
    },
    {
      transactionId: "4",
      catId: "1",
      userId: "1",
      note: "",
      walletId: "1",
      transactionDate: "2021-11-11",
      amount: 400,
    },
    {
      transactionId: "5",
      catId: "1",
      userId: "1",
      note: "Awesome note",
      walletId: "1",
      transactionDate: "2021-11-12",
      amount: 500,
    },
    {
      transactionId: "6",
      catId: "1",
      userId: "1",
      note: "",
      walletId: "1",
      transactionDate: "2021-11-13",
      amount: 600,
    }
  ];

  viewMode!: string;

  selectedTransaction!: Transaction2;
  selected: boolean = false;

  ngOnInit(): void {
  }

  onTransactionSelected(transaction: Transaction2) {
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

