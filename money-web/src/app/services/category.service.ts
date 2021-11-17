<<<<<<< HEAD
<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Category} from "../view-model/category";
=======

=======
>>>>>>> de60674d (reconstruct category component)
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
>>>>>>> 9a8fdba3 (update category component)

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
<<<<<<< HEAD
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
=======

  constructor(private httpService: HttpService) { }
>>>>>>> de60674d (reconstruct category component)

  // getTransactions() {
  // }
}

export interface Category {
  categoryId: string;
  userId: string;
  is_expense:boolean;
  categoryName: string;
  catId: string;
  icon: string;
  type: number;
  
}

export interface CategoryResponse {
  categories: Category[];
}
<<<<<<< HEAD

>>>>>>> 9a8fdba3 (update category component)
=======
>>>>>>> de60674d (reconstruct category component)
