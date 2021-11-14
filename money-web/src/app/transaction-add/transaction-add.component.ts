import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {TransactionView} from "../view-model/transactions";
import {type} from "jquery";
import {Utils} from "../util/utils";

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  @Input() transaction = new TransactionView();
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  constructor(private transactionService: TransactionService) {
  }

  onChangeAmount(value: string): void {
    let res = value.replace(/\D/g, "");

    if (res === null || res.length <= 0) {
      this.transaction.amount = 0;
      this.inputElement!.nativeElement.value = this.getFormatAmount();
      return;
    }
    let numberAmount = parseInt(res);
    if (numberAmount < 200000000000) {
      this.transaction.amount = numberAmount
    }
    this.inputElement!.nativeElement.value = this.getFormatAmount();
    console.log(this.transaction);
  }

  getFormatAmount(): string {
    return Utils.formatNumber(this.transaction.amount.toString())
  }

  onChangeNote(value: string): void {
    this.transaction.note = value;
    console.log(this.transaction);
  }


  onChangeDate(result: Date): void {
    this.transaction.transactionDate = result;
    console.log(this.transaction);
  }

  ngOnInit(): void {
  }

  addTransaction() {
    console.log(this.transaction);
    // this.transactionService.addTransaction(this.transaction.toTransaction())
  }


}
