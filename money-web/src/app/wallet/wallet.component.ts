import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  add_wallet = false;

  constructor() { }

  ngOnInit(): void {
  }

  back() {
    window.location.href = '/home';
  }

  addWallet() {
    this.add_wallet = true;
  }

}
