import {Wallet} from "../services/wallet.service";

export class WalletView {
  id: string;
  name: string;
  currency: string;
  balance: number;
  icon: string;
  type: number;
  isCurrent: boolean;

  constructor() {
    this.id = "";
    this.name = "My Wallet";
    this.balance = 0;
    this.currency = "VND";
    this.icon = "wallet_icon";
    this.type = 0;
    this.isCurrent = false;
  }

  addWallet(wallet: Wallet): WalletView {
    this.id = wallet.id;
    this.name = wallet.name;
    this.icon = wallet.icon;
    this.type = wallet.type;
    this.currency = wallet.currency;
    this.balance = wallet.balance;
    return this;
  }

  toWallet(): Wallet {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      currency: this.currency,
      balance: this.balance,
      icon: this.icon
    }
  }
}
