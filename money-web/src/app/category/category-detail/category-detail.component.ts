<<<<<<< HEAD
<<<<<<< HEAD
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
=======
import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
>>>>>>> 9a8fdba3 (update category component)
import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserDetail } from 'src/app/services/auth.service';
<<<<<<< HEAD
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/util/utils';
import { CategoryView } from 'src/app/view-model/category';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {


  categoryViewMode !: string;
  categoryList: CategoryView[] = [];
  data: CategoryView[] =[];

  categoryListDL: CategoryView[] = [];
  dataDL: CategoryView[] = [];

  categoryListIN: CategoryView[] = [];
  dataIN: CategoryView[] = [];

  categoryListOUT: CategoryView[] = [];
  dataOUT: CategoryView[] = [];

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


  constructor(private categoryService: CategoryService, private authService: AuthService, private commonService: CommonService) {
    this.currentUser = jwtDecode(this.authService.userDetail.token);

  }



  ngOnInit(): void {
    this.loadCategoryList();
    this.data = this.categoryList;
    this.dataDL = this.categoryListDL;
    this.dataIN = this.categoryListIN;
    this.dataOUT = this.categoryListOUT;
    this.commonService.currentCategoryViewMode.subscribe(mode => { this.categoryViewMode = mode; });
    console.log(this.categoryViewMode);
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
                console.log(res);
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
        this.categoryService.getAllCategory()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (res) => {
                if (!res || res.length <= 0) {
                    this.canLoadMore = false;
                }
                res.forEach(element => {
                  if(element.type ==0){
                    this.categoryListDL.push(new CategoryView().addCategory(element));
                  }
                });

            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isListLoading = false;
            }
        )
        this.categoryService.getAllCategory()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (res) => {
                if (!res || res.length <= 0) {
                    this.canLoadMore = false;
                }
                res.forEach(element => {
                  if(element.type ==1){
                    this.categoryListOUT.push(new CategoryView().addCategory(element));
                  }
                });

            },
            (err) => {
                console.log(err)
            },
            () => {
                this.isListLoading = false;
            }
        )
        this.categoryService.getAllCategory()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (res) => {
                if (!res || res.length <= 0) {
                    this.canLoadMore = false;
                }
                res.forEach(element => {
                  if(element.type ==2){
                    this.categoryListIN.push(new CategoryView().addCategory(element));
                  }
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

=======
import { Wallet, WalletService } from 'src/app/services/wallet.service';

=======
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/services/category.service';
import { Transaction } from 'src/app/services/transaction.service';
>>>>>>> de60674d (reconstruct category component)

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category!: Category;
  @Output() closed = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeDetail() {
    this.closed.emit(true);
    let dialog = document.getElementById('category-detail') as HTMLElement;
    dialog.hidden = true;
    let dialogList = document.getElementsByClassName('list-category') as HTMLCollectionOf<HTMLElement>;
    if (dialogList.length > 0) {
      dialogList[0].style.marginLeft = '50%';
    }
  }

<<<<<<< HEAD
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
>>>>>>> 9a8fdba3 (update category component)
=======
>>>>>>> de60674d (reconstruct category component)
}
