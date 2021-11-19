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

    getTransactions(filter: TransactionRequest) {
        return this.httpService.post<Transaction2[]>(`${this.route}/filter?limit=${filter.limit}&offset=${filter.offset}`, filter.filter)
    }

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
    transaction_id: string;
    user_id: string;
    wallet_id: string;
    cat_id: string;
    amount: number;
    note: string;
    transaction_date: number;
}

export interface TransactionResponse {
    transactions: Transaction2[];
}

export interface TransactionFilter {
    catId: string;
    endAmount: number;
    startAmount: number;
    startDate: number;
    endDate: number;
    keyNote: string;
    walletId: string;
}

export interface TransactionRequest {
    filter: TransactionFilter;
    limit: number;
    offset: number;
}
