import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';




@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {

  constructor() { }

  openCurrencySelection () {
    if ($('.wallet-currency-selection').is(":hidden")) {
      $('.wallet-currency-selection').show()
      $('.wallet-detail').hide()
    }
  }

  selectWalletType () {
    if ($('.wallet-type') && $('.wallet-detail')) {
      if ($('.wallet-detail').is(":visible")) {
        $('.wallet-detail').hide()
        $('.wallet-type').show()
      }
    }
  }

  showDetail () {
    if ($('.wallet-type') && $('.wallet-detail')) {
      if ($('.wallet-detail').is(":hidden")) {
        $('.wallet-detail').show()
        $('.wallet-type').hide()
        $('.save-btn').show()
      }
    }
  }

  ngOnInit(): void {
  }

}
