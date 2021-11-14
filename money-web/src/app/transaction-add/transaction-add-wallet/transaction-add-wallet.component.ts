import {Component, Input, OnInit} from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {WalletView} from "../../view-model/wallet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Utils} from "../../util/utils";

@Component({
  selector: 'app-transaction-add-wallet',
  templateUrl: './transaction-add-wallet.component.html',
  styleUrls: ['./transaction-add-wallet.component.css']
})
export class TransactionAddWalletComponent implements OnInit {
  @Input() wallets!: WalletView[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getFormatAmount(value: number) {
    return Utils.formatNumber(value.toString())
  }


}
