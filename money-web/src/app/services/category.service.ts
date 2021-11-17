<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Category} from "../view-model/category";
=======

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
>>>>>>> 9a8fdba3 (update category component)

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
<<<<<<< HEAD

=======
>>>>>>> 9a8fdba3 (update category component)
    private route = "category"

    constructor(private httpService: HttpService) {
    }

<<<<<<< HEAD
    getAllCategory() {
        return this.httpService.get<Category[]>(this.route)
    }

    getCategoryById(id: string) {
        return this.httpService.get<Category>(`${this.route}/${id}`);
    }
}
=======
    addCategory(data: CategoryRequest) {
        return new Observable<string>((observable) => {
            this.httpService.post<CategoryResponse>('category', data).subscribe((response: CategoryResponse) => {
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

    getCategoryPaging(offset: number = 0, limit: number = 10) {
        return this.httpService.get<Category[]>(this.route, {
            params: {
                from: offset,
                limit: limit
            }
        })
    }

    getCategoryById(id: string) {
        return this.httpService.get<Category>(`${this.route}/${id}`)
    }
}

export interface Category {

}

export interface CategoryRequest {
}

export interface CategoryResponse {
}

>>>>>>> 9a8fdba3 (update category component)
