import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpService} from './http.service';
import {Transaction} from "../view-model/transactions";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    private route = "wallet"

    constructor(private httpService: HttpService) {
    }

    addWallet(wallet: Wallet) {
        return this.httpService.post<Wallet>(this.route, wallet).pipe(
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

    editWallet(wallet: Wallet) {
        return this.httpService.put<Wallet>(this.route, wallet).pipe(
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

    deleteWallet(id: string) {
        return this.httpService.delete<Wallet>(this.route, id).pipe(
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

    getWalletPaging(offset: number = 0, limit: number = 10) {
        return this.httpService.get<Wallet[]>(this.route, {
            params: {
                from: offset,
                limit: limit
            }
        })
    }

    getWalletById(id: string) {
        return this.httpService.get<Wallet>(`${this.route}/${id}`)
    }
}

export interface Wallet {
    id: string,
    name: string,
    type: number,
    currency: string,
    balance: number,
    icon: string
}

export interface WalletRequest {
    balance: number;
    currency: string;
    icon: string;
    id: string;
    name: string;
    type: number;
}

export interface WalletResponse {
    balance: number;
    currency: string;
    icon: string;
    id: string;
    name: string;
    type: number;
}

