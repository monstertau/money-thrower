import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {TransactionModel} from "../models/transactions";

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  @Input() transaction = new TransactionModel(
    {id: "", wallet_id: "", cat_id: "", amount: 0, note: "", timestamp: Date.now()},
    {id: "", type: 0, cat_name: "", icon: ""}
  )

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
  }

  addTransaction() {
    this.transactionService.addTransaction(this.transaction.toTransaction())
  }
}
