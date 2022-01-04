import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {CategoryViewMode, CommonService, ViewMode} from 'src/app/services/common.service';
import {TransactionAddComponent} from 'src/app/transaction-add/transaction-add.component';
import {Utils} from 'src/app/util/utils';
import {TransactionView} from 'src/app/view-model/transactions';
import {WalletView} from 'src/app/view-model/wallet';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {TransactionService} from "../../../services/transaction.service";
import {categoryType, CategoryView} from 'src/app/view-model/category';
import {CategoryService} from 'src/app/services/category.service';
import {CategoryFormComponent} from 'src/app/category/category-form/category-form.component';

@Component({
    selector: 'app-topbar-category',
    templateUrl: './topbar-category.component.html',
    styleUrls: ['./topbar-category.component.css']
})
export class TopbarCategoryComponent implements OnInit {
    currentPage!: string;
    currentMode: string = CategoryViewMode.ALL;
    viewToolTip: string;
    @Input() categoryList: CategoryView[] = [];

    showAddModal = false;
    categoryAddLoading = false;
    currentCategory!: CategoryView;

    constructor(private categoryService: CategoryService, private notification: NzNotificationService, private modal: NzModalService, private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
        switch (this.currentMode) {
            case CategoryViewMode.ALL:
                this.viewToolTip = CategoryViewMode.DL + "categories";
                break;
            case CategoryViewMode.OUT:
                this.viewToolTip = CategoryViewMode.CUS + "categories";
                break;
            case CategoryViewMode.DL:
                this.viewToolTip = CategoryViewMode.IN + "categories";
                break;
            case CategoryViewMode.IN:
                this.viewToolTip = CategoryViewMode.OUT + "categories";
                break;
            case CategoryViewMode.CUS:
                this.viewToolTip = CategoryViewMode.ALL + "categories";
                break;
            default:
                this.viewToolTip = "All categories";
                break;
        }
    }

    ngOnInit(): void {
        this.commonService.currentCategoryViewMode.subscribe(mode => {
            this.currentMode = mode
        });
        this.commonService.currentPage.subscribe(page => {
            this.currentPage = page;
        });

        this.currentCategory = new CategoryView();
        this.currentCategory.name = ""
    }

    changeCategoryViewMode() {
        if (this.currentMode === CategoryViewMode.CUS) {
            this.currentMode = CategoryViewMode.ALL;
            this.viewToolTip = "Debt or Loan categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        } else if (this.currentMode === CategoryViewMode.ALL) {
            this.currentMode = CategoryViewMode.DL;
            this.viewToolTip = "Income categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        } else if (this.currentMode === CategoryViewMode.DL) {
            this.currentMode = CategoryViewMode.IN;
            this.viewToolTip = "Outcome categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        } else if (this.currentMode === CategoryViewMode.IN) {
            this.currentMode = CategoryViewMode.OUT;
            this.viewToolTip = "Custom categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        } else {
            this.currentMode = CategoryViewMode.CUS;
            this.viewToolTip = "All categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        }
    }

    showCategoryForm() {
        this.showAddModal = true;
    }

    handleSave() {
        this.categoryAddLoading = true;
        this.addCategory()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.categoryAddLoading = false;
                    this.showAddModal = false;
                    this.currentCategory = new CategoryView()
                    this.currentCategory.name = "";
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.categoryAddLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async addCategory() {
        let error = null;

        if (!this.currentCategory.name) {
            error = new Error("Please fill in category name")
            throw error
        }

        if (this.currentCategory.isExpense) {
            this.currentCategory.type = categoryType.OUTCOME
        } else {
            this.currentCategory.type = categoryType.INCOME
        }

        this.categoryService.create(this.currentCategory.toCategory()).subscribe(
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

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }
}
