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


@Component({
    selector: 'app-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit, OnDestroy {

    @Output() editWallet = new EventEmitter<string>();
    walletList: Wallet[] = [];
    data: Wallet[] = [];

    selectedWallet: Wallet = {
        id: "",
        name: "",
        type: 0,
        currency: "",
        balance: 0,
        icon: ""
    };

    private readonly destroy$ = new Subject();

    currentUser: UserDetail;

    pageSize: number = 4;

    pageOffset: number = 0;

    isListLoading: boolean = false;

    isDetailLoading: boolean = true;

    canLoadMore: boolean = true;

    fallbackIcon = 'assets/catalogs/wallet_icon.png';

    get isListEmpty(): boolean {
        return this.walletList.length <= 0
    }

    constructor(private walletService: WalletService, private authService: AuthService) {
        this.currentUser = jwtDecode(this.authService.userDetail.token);
    }

    ngOnInit() {
        this.loadWalletList();
        this.data = this.walletList;
    }

    loadMore() {
        this.pageOffset += this.pageSize;
        this.loadWalletList();
    }

    editWalletDetail() {
        this.editWallet.emit();
    }

    loadWalletList() {
        this.isListLoading = true;
        this.walletService.getWalletPaging(this.pageOffset, this.pageSize)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    if (!res || res.length <= 0) {
                        this.canLoadMore = false;
                    }
                    res.forEach(element => {
                        this.walletList.push(element);
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

    loadWalletDetail(id: string) {
        this.isDetailLoading = true;
        this.walletService.getWalletById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    this.selectedWallet = res;
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    this.isDetailLoading = false;
                }
            )
    }

    selectWallet(id: string) {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "21%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }

        this.loadWalletDetail(id);
    }

    hideWalletDetail() {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft == '21%' && !dialogDetail.hidden) {
            dialog[0].style.marginLeft = "50%";
            dialogDetail.hidden = true;
        }
    }

    formatCurrency(balance: number) {
        return balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    getIcon(icon: string) {
        return "assets/catalogs/" + icon + ".png";
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
>>>>>>> 9a8fdba3 (update category component)
}
