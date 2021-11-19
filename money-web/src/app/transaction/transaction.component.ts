import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction2, TransactionFilter, TransactionRequest } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../view-model/transactions';
import { CategoryService } from '../services/category.service';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: TransactionView[] = [];
  data: Transaction2[] = [];
  selectedTransaction!: TransactionView;
  selected: boolean = false;
  currentWalletId!: string;
  filter: TransactionFilter = {
    catId: '',
    walletId: '',
    endAmount: 0,
    startAmount: 0,
    startDate: 0,
    endDate: 0,
    keyNote: '',
  };
  inflow: number = 0;
  outflow: number = 0;
  total: number = 0;

  constructor(private transactionService: TransactionService,
    private categoryService: CategoryService,
    private walletService: WalletService,
    private commonService: CommonService,) {
    this.commonService.currentWallet.subscribe(wallet => { this.currentWalletId = wallet; });
    this.filter.walletId = this.currentWalletId;
  }

  ngOnInit(): void {
    let req: TransactionRequest = {
      filter: this.filter,
      limit: 10,
      offset: 0,
    }
    this.transactionService.getTransactions(req).subscribe(transactions => {
      this.data = transactions;
      transactions.forEach(transaction => {
        this.transactions.push(new TransactionView().addTransaction(transaction));
      })
      this.getCategory();
      this.getWallet();
    });
  }

  getWallet() {
    this.walletService.getWalletById(this.currentWalletId).subscribe(
      data => {
        for (let transaction of this.transactions) {
          transaction.addWallet(data);
        }
      }
    );
  }

  getCategory() {
    for (let i = 0; i < this.data.length; i++) {
      this.categoryService.getCategoryById(this.data[i].cat_id).subscribe(data => {
        this.transactions[i].addCategory(data);
        if (data.is_expense) this.outflow += this.transactions[i].amount;
        else this.inflow += this.transactions[i].amount;
        this.total = this.inflow - this.outflow;
      })
    }
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

