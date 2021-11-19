import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Transaction} from "../view-model/transactions";
import {Observable, throwError} from "rxjs";
import {WalletResponse} from "./wallet.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private route = 'transaction'

    constructor(private httpService: HttpService) {
    }

    // getTransactions() {
    // }
    createTransaction(transaction: Transaction) {

        return this.httpService.post<Transaction>(this.route, transaction).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
                }
                return throwError(error);
            })
        );


    }
}

export interface Transaction2 {
    transactionId: string;
    userId: string;
    walletId: string;
    catId: string;
    amount: number;
    note: string;
    transactionDate: string;
}

export interface TransactionResponse {
    transactions: Transaction2[];
}
