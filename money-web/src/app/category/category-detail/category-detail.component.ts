import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserDetail } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Utils } from 'src/app/util/utils';
import { CategoryView } from 'src/app/view-model/category';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  categoryList: CategoryView[] = [];
  data: CategoryView[] =[];

  selectedCategory = new CategoryView();

  private readonly destroy$ = new Subject();

  currentUser: UserDetail;

  isListLoading: boolean = false;

  isDetailLoading: boolean = true;

  canLoadMore: boolean = true;

  fallbackIcon = 'assets/catalogs/null.png';

  get isListEmpty(): boolean {
    return this.categoryList.length <= 0
} 


  constructor(private categoryService: CategoryService, private authService: AuthService) {
    this.currentUser = jwtDecode(this.authService.userDetail.token);
  }



  ngOnInit(): void {
    this.loadCategoryList();
    this.data = this.categoryList;
  }

  loadCategoryList() {
    this.isListLoading = true;
    this.categoryService.getAllCategory()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (res) => {
                if (!res || res.length <= 0) {
                    this.canLoadMore = false;
                }
                res.forEach(element => {
                    this.categoryList.push(new CategoryView().addCategory(element));
                });
            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isListLoading = false;
            }
        )
}


  loadCategoryDetail(id: string) {
    this.isDetailLoading = true;
    this.categoryService.getCategoryById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (res) => {
                this.selectedCategory = new CategoryView().addCategory(res);
            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isDetailLoading = false;
            }
        )
}

  selectCategory(id: string) {
    let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
    let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
    if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
        dialog[0].style.marginLeft = "21%";
        setTimeout(() => {
            dialogDetail.hidden = false;
        }, 500);
    }

    this.loadCategoryDetail(id);
}

  hideCategoryDetail() {
    let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
    let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
    if (dialog.length != 0 && dialog[0].style.marginLeft == '21%' && !dialogDetail.hidden) {
        dialog[0].style.marginLeft = "50%";
        dialogDetail.hidden = true;
    }
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
