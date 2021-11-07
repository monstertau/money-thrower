import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    private route = "wallet"

    constructor(private httpService: HttpService) {
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

