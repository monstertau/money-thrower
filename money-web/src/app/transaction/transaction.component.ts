import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction2, TransactionFilter } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../view-model/transactions';
import { CategoryService } from '../services/category.service';
import { WalletService } from '../services/wallet.service';
import { Category, CategoryView } from '../view-model/category';
import { Utils } from '../util/utils';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: TransactionView[] = [];
  selectedTransaction!: TransactionView;
  selected: boolean = false;
  currentWalletId!: string;
  filter: TransactionFilter = {
    cat_id: '',
    wallet_id: '',
    end_amount: 0,
    start_amount: 0,
    start_date: 0,
    end_date: 0,
    key_note: '',
  };
  inflow: number = 0;
  outflow: number = 0;

  transactionByCategory: TransactionView[][] = [];
  categoryList: string[] = [];

  transactionByTime: TransactionView[][] = [];
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();
  dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();

  constructor(private transactionService: TransactionService,
    private categoryService: CategoryService,
    private walletService: WalletService,
    private commonService: CommonService,) {
    this.commonService.currentWallet.subscribe(wallet => { this.currentWalletId = wallet; });
    this.filter.wallet_id = this.currentWalletId;
  }

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction() {
    this.categoryList = [];
    this.transactionByCategory = [];
    this.transactionByTime = [];
    this.inflow = 0;
    this.outflow = 0;
    let dateRange = Utils.getDateRange(this.currentYear, this.currentMonth, this.dateNum);
    this.filter.cat_id = '';
    this.filter.start_date = dateRange.startDate;
    this.filter.end_date = dateRange.endDate;

    this.transactionService.getTransactions(this.filter).subscribe(transactions => {
      transactions.forEach(transaction => {
        if (!this.categoryList.includes(transaction.cat_id)) this.categoryList.push(transaction.cat_id);
      })
      this.getTransactionByCategory();
    });
    this.getTransactionByTime();
  }

  getWallet(transaction: TransactionView) {
    this.walletService.getWalletById(this.currentWalletId).subscribe(
      data => {
        transaction.addWallet(data);
      }
    );
  }

  getCategory(transaction: TransactionView) {
    this.categoryService.getCategoryById(transaction.category.id).subscribe(data => {
      transaction.addCategory(data);
      this.calculateFlow(transaction);
    })
  }

  getTransactionByCategory() {
    let dateRange = Utils.getDateRange(this.currentYear, this.currentMonth, this.dateNum);
    this.filter.start_date = dateRange.startDate;
    this.filter.end_date = dateRange.endDate;
    this.categoryList.forEach(category => {
      this.filter.cat_id = category;
      let items: TransactionView[] = [];
      this.transactionService.getTransactions(this.filter).subscribe(transactions => {
        items = [];
        transactions.forEach(transaction => {
          let transactionView: TransactionView = new TransactionView().addTransaction(transaction);
          transactionView.category.id = transaction.cat_id;
          this.getCategory(transactionView);
          this.getWallet(transactionView);
          items.push(transactionView);
        })
        this.transactionByCategory.push(items);
      })
    })
  }

  getTransactionByTime() {
    for (let i = this.dateNum - 1; i >= 0; i--) {
      this.filter.start_date = new Date(`${this.currentYear}/${this.currentMonth}/${i + 1} 00:00:00 +0000`).getTime();
      this.filter.end_date = new Date(`${this.currentYear}/${this.currentMonth}/${i + 1} 23:59:59 +0000`).getTime();
      this.filter.cat_id = '';
      let items: TransactionView[] = [];
      this.transactionService.getTransactions(this.filter).subscribe(transactions => {
        items = [];
        transactions.forEach(transaction => {
          if (transaction) {
            let transactionView: TransactionView = new TransactionView().addTransaction(transaction);
            transactionView.category.id = transaction.cat_id;
            this.getCategory(transactionView);
            this.getWallet(transactionView);
            items.push(transactionView);
          }
        })
        if (items.length)
          this.transactionByTime.push(items);
      })
    }
  }

  calculateFlow(transaction: TransactionView) {
    if (!transaction.category.isExpense) this.inflow += transaction.amount;
    else this.outflow += transaction.amount;
  }

  onTransactionSelected(transaction: TransactionView) {
    this.selectedTransaction = transaction
    this.selected = true;
  }

  onTransactionDetailClose(closed: boolean) {
    this.selected = closed;
  }

  onMonthChange(month: any) {
    this.commonService.changeMonth(month);
    if (month == 'future') {
      this.onFutureChange();
    }
    else if (month == 'last') {
      this.onLastChange();
    }
    else this.onCurrentChange();
  }

  onCurrentChange() {
    this.currentMonth = new Date().getMonth() + 1;
    this.dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.getTransaction();
  }

  onFutureChange() {
    this.currentMonth = new Date().getMonth() + 1;
    if (this.currentMonth == 12) {
      this.currentMonth = 1;
      this.currentYear += 1;
      this.dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();
    } else {
      this.currentMonth += 1;
      this.dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();
    }
    this.getTransaction();
  }

  onLastChange() {
    this.currentMonth = new Date().getMonth() + 1;
    if (this.currentMonth == 1) {
      this.currentMonth = 12;
      this.currentYear -= 1;
      this.dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate();
    } else { this.currentMonth -= 1; this.dateNum = new Date(this.currentYear, this.currentMonth, 0).getDate(); }
    this.getTransaction();
  }
}

