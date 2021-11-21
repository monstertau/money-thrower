import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from 'src/app/view-model/transactions';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions!: TransactionView[][];
  @Input() transactionsByTime!: TransactionView[][];
  @Output() selectedTransaction = new EventEmitter<TransactionView>();
  @Input() inflow!: number;
  @Input() outflow!: number;
  viewMode!: string;
  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonService.currentViewMode.subscribe(mode => { this.viewMode = mode; });
  }

  selectTransaction(transaction: TransactionView) {
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

  calculateTotalAmount(transaction: TransactionView[]) {
    let total = 0;
    transaction.forEach(element => {
      if (element.category.isExpense) total -= element.amount;
      else total += element.amount;
    });
    return total;
  }

  getDate(date: string) {
    return Utils.getDate(date);
  }

  getFormatBalance(balance: number) {
    if (balance)
      return Utils.formatCurrency(balance);
    return '0';
  }

}
