import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from 'src/app/view-model/transactions';
import { Transaction2 } from 'src/app/services/transaction.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions!: TransactionView[];
  @Output() selectedTransaction = new EventEmitter<TransactionView>();
  @Input() inflow!: number;
  @Input() outflow!: number;
  @Input() total!: number;
  viewMode!: string;
  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonService.currentViewMode.subscribe(mode => { this.viewMode = mode; })
  }

  selectTransaction(id: string) {
    let transaction = this.transactions.find(transaction => transaction.id === id);
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

  getFormatBalance(balance: number) {
    return Utils.formatCurrency(balance);
  }

}
