import {Category, CategoryView} from "./category";
import {WalletView} from "./wallet";
import {Wallet} from "../services/wallet.service";

export interface Transaction {
  id: string;
  wallet_id: string;
  cat_id: string;
  amount: number;
  note: string;
  timestamp: number;
}

export class TransactionView {
  id: string;
  wallet: WalletView;
  category: CategoryView;
  amount: number;
  note: string;
  transactionDate: Date;

  constructor() {
    this.id = "";
    this.wallet = new WalletView();
    this.amount = 0;
    this.note = "";
    this.transactionDate = new Date();
    this.category = new CategoryView()
  }

  addTransaction(transaction: Transaction): TransactionView {
    this.id = transaction.id;
    this.amount = transaction.amount;
    this.note = transaction.note;
    this.transactionDate = new Date(transaction.timestamp * 1000);
    return this;
  }

  addCategory(category: Category): TransactionView {
    this.category.addCategory(category)
    return this;
  }

  addWallet(wallet: Wallet): TransactionView {
    this.wallet.addWallet(wallet)
    return this;
  }

  addWalletView(walletView: WalletView): TransactionView {
    this.wallet = walletView;
    return this;
  }

  toTransaction(): Transaction {
    return {
      id: this.id,
      wallet_id: this.wallet.id,
      cat_id: this.category.id,
      amount: this.amount,
      note: this.note,
      timestamp: this.transactionDate.getTime(),
    }
  }
}
