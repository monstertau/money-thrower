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
import { CategoryView } from 'src/app/view-model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormComponent } from 'src/app/category/category-form/category-form.component';

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

    constructor(private categoryService: CategoryService, private notification: NzNotificationService, private modal: NzModalService, private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
        switch (this.currentMode) {
            case CategoryViewMode.ALL:
                this.viewToolTip = CategoryViewMode.DL + "categories";
                break;
            case CategoryViewMode.OUT:
                this.viewToolTip = CategoryViewMode.ALL + "categories";
                break;
            case CategoryViewMode.DL:
                this.viewToolTip = CategoryViewMode.IN + "categories";
                break;
            case CategoryViewMode.IN:
                this.viewToolTip = CategoryViewMode.OUT + "categories";
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
    }

    changeCategoryViewMode() {
        if (this.currentMode === CategoryViewMode.OUT) {
            this.currentMode = CategoryViewMode.ALL;
            this.viewToolTip = "Debt or Loan categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        } else if(this.currentMode === CategoryViewMode.ALL){
            this.currentMode = CategoryViewMode.DL;
            this.viewToolTip = "Income categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        }
        else if(this.currentMode === CategoryViewMode.DL){
            this.currentMode = CategoryViewMode.IN;
            this.viewToolTip = "Outcome categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        }
        else {
            this.currentMode = CategoryViewMode.OUT;
            this.viewToolTip = "All categories";
            this.commonService.changeCategoryViewMode(this.currentMode);
        }
    }

    addCategory() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Add Category',
            nzClassName: "add-category-modal",
            nzContent: CategoryFormComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
            },
            nzWidth: 700,
            nzClosable: false,
            nzFooter: [
                {
                    label: 'Cancel',
                    type: 'default',
                    size: 'large',
                    onClick: () => modal.destroy()
                },
                {
                    label: 'Save',
                    type: 'primary',
                    size: 'large',
                    onClick: () => {

                    }
                },
            ]
        });
    }
}
