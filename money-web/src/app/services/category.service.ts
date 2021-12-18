import {Injectable} from '@angular/core';
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

    getCategoryById(id: string) {
        return this.httpService.get<Category>(`${this.route}/${id}`);
    }

    create(category: Category) {
        return this.httpService.post(`${this.route}`, category);
    }

    edit(category: Category) {
        return this.httpService.put(`${this.route}`, category);
    }

    delete(categoryId: string) {
        return this.httpService.delete(this.route, categoryId);
    }
}
