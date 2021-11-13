import {Category, CategoryModel} from "./category";

export interface Transaction {
  id: string;
  wallet_id: string;
  cat_id: string;
  amount: number;
  note: string;
  timestamp: number;
}

export class TransactionModel {
  id: string;
  walletId: string;
  category: CategoryModel;
  amount: number;
  note: string;
  timestamp: Date;

  constructor(transaction: Transaction, category: Category) {
    this.id = transaction.id;
    this.walletId = transaction.wallet_id;
    this.amount = transaction.amount;
    this.note = transaction.note;
    this.timestamp = new Date(transaction.timestamp * 1000);
    this.category = new CategoryModel(category)
  }

  toTransaction(): Transaction {
    return {
      id: this.id,
      wallet_id: this.walletId,
      cat_id: this.category.id,
      amount: this.amount,
      note: this.note,
      timestamp: this.timestamp.getTime(),
    }
  }
}
