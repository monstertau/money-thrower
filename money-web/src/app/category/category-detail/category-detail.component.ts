import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserDetail } from 'src/app/services/auth.service';
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
    data: CategoryView[] = [];

    categoryListDL: CategoryView[] = [];
    dataDL: CategoryView[] = [];

    categoryListIN: CategoryView[] = [];
    dataIN: CategoryView[] = [];

    categoryListOUT: CategoryView[] = [];
    dataOUT: CategoryView[] = [];

    categoryListCUS: CategoryView[] = [];
    dataCUS: CategoryView[] = [];

    selectedCategory = new CategoryView();

    private readonly destroy$ = new Subject();

    currentUser: UserDetail;

    isListLoading: boolean = false;

    isDetailLoading: boolean = true;

    canLoadMore: boolean = true;

    fallbackIcon = 'assets/catalogs/null.png';

    showEditModal: boolean = false;

    categoryEditLoading: boolean = false;

    currentCategory!: CategoryView;

    showDeleteModal: boolean = false;

    deleteLoading: boolean = false;

    get isListEmpty(): boolean {
        return this.categoryList.length <= 0
    }


    constructor(private categoryService: CategoryService, private authService: AuthService, private commonService: CommonService, private notification: NzNotificationService) {
        this.currentUser = jwtDecode(this.authService.userDetail.token);

    }

    ngOnInit(): void {
        this.loadCategoryList();
        this.data = this.categoryList;
        this.dataDL = this.categoryListDL;
        this.dataIN = this.categoryListIN;
        this.dataOUT = this.categoryListOUT;
        this.dataCUS = this.categoryListCUS;
        this.commonService.currentCategoryViewMode.subscribe(mode => { this.categoryViewMode = mode; });
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
                    //console.log(res);
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
                        if (element.type == 0) {
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
                        if (element.type == 1) {
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
                        if (element.type == 2) {
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
        this.categoryService.getAllCategory()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    if (!res || res.length <= 0) {
                        this.canLoadMore = false;
                    }
                    res.forEach(element => {
                        if (element.owner_id !== "00000000-0000-0000-0000-000000000000") {
                            this.categoryListCUS.push(new CategoryView().addCategory(element));
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
                    this.selectedCategory.parent = this.categoryList.filter((value) => value.id == this.selectedCategory.parent?.id)[0];
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

    showCategoryForm() {
        this.showEditModal = true;
    }

    handleSave() {
        this.showEditModal = true;
        this.editCategory()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.categoryEditLoading = false;
                    this.showEditModal = false;
                    this.currentCategory = new CategoryView()
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.categoryEditLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    handleDelete() {
        this.deleteLoading = true;
        this.deleteCategory()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.deleteLoading = false;
                    this.showDeleteModal = false;
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.deleteLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async editCategory() {
        let error = null;

        if (!this.currentCategory.name) {
            error = new Error("Please fill in category name")
        }

        if (error !== null) {
            throw error
        }

        let me = this;

        this.categoryService.edit(this.currentCategory.toCategory()).subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
                me.showErrorMessage(error.toString())
                throw error
            }
        )
    }

    async deleteCategory() {
        let error = null;
        this.categoryService.delete(this.selectedCategory.id).subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
            }
        )
        if (error !== null) {
            throw error
        }
    }

    onEditClick() {
        this.currentCategory = Object.assign(Object.create(Object.getPrototypeOf(this.selectedCategory)), this.selectedCategory)
        this.showEditModal = true
    }

    onDeleteClick() {
        this.showDeleteModal = true
    }


    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
