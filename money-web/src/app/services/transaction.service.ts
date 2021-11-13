import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpService: HttpService) { }

  // getTransactions() {
  // }
}

export interface Transaction {
  transactionId: string;
  userId: string;
  walletId: string;
  catId: string;
  amount: number;
  note: string;
  transactionDate: string;
}

export interface TransactionResponse {
  transactions: Transaction[];
}
