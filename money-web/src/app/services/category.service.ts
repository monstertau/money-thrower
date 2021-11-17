import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService) { }

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
