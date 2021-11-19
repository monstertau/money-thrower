import {Injectable} from '@angular/core';
import {Wallet} from "./wallet.service";
import {HttpService} from "./http.service";
import {Category} from "../view-model/category";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private route = "category"

    constructor(private httpService: HttpService) {
    }

    getAllCategory() {
        return this.httpService.get<Category[]>(this.route)
    }
}
