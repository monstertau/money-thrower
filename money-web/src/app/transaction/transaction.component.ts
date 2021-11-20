import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction2, TransactionFilter, TransactionRequest } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../view-model/transactions';
import { CategoryService } from '../services/category.service';
import { WalletService } from '../services/wallet.service';
import { Category, CategoryView } from '../view-model/category';

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
  total: number = 0;

  transactionByCategory: TransactionView[][] = [];
  categoryList: string[] = [];
  categories!: Category[];

  constructor(private transactionService: TransactionService,
    private categoryService: CategoryService,
    private walletService: WalletService,
    private commonService: CommonService,) {
    this.commonService.currentWallet.subscribe(wallet => { this.currentWalletId = wallet; });
    this.filter.wallet_id = this.currentWalletId;
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
        if (!this.categoryList.includes(transaction.cat_id)) this.categoryList.push(transaction.cat_id);
      })
      this.getTransactionByCategory();
    });
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
      if (data.is_expense) this.outflow += transaction.amount;
      else this.inflow += transaction.amount;
      this.total = this.inflow - this.outflow;
    })
  }

  getTransactionByCategory() {
    this.categoryList.forEach(category => {
      this.filter.cat_id = category;
      let req: TransactionRequest = {
        filter: this.filter,
        limit: 0,
        offset: 0,
      }
      let items: TransactionView[] = [];
      this.transactionService.getTransactions(req).subscribe(transactions => {
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
    console.log(this.transactionByCategory);
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
  }
}

