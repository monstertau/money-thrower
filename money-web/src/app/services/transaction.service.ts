import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Transaction} from "../models/transactions";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private route = "wallet"

  constructor(private httpService: HttpService) {
  }

  addTransaction(transaction: Transaction) {
    return this.httpService.post<Transaction>(this.route, JSON.stringify(transaction))
  }
}
