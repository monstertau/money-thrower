import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(private httpService: HttpService) {
    }

    addWallet(data: WalletRequest) {
        return new Observable<string>((observable) => {
            this.httpService.post<WalletResponse>('wallet', data).subscribe((response: WalletResponse) => {
                if (!response) {
                    observable.next('FAIL');
                } else {
                    console.log(response)
                    observable.next('SUCCESS');
                }
            }, (error) => {
                observable.error(error);
            });
            return {
                unsubscribe() {
                }
            };
        })
    }
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
