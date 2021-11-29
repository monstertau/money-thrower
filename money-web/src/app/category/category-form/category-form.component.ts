import { Component, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopupSelectCategoryComponent } from 'src/app/components/popup-select-category/popup-select-category.component';
import { PopupSelectIconComponent } from 'src/app/components/popup-select-icon/popup-select-icon.component';
import { CategoryService } from 'src/app/services/category.service';
import { WalletService } from 'src/app/services/wallet.service';
import { CategoryView } from 'src/app/view-model/category';
import { WalletView } from 'src/app/view-model/wallet';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

    @Input() category = new CategoryView();

    private readonly destroy$ = new Subject();

    categories: CategoryView[] = [];

    checkbox: boolean = false;

    selectedCategoryId = null;

    showParentCategoryModal: boolean = false;

    hasChooseCategory: boolean = false;

    get parentCategoryIcon() : string {
        let iconName = this.category.parent?.icon ?? "null";

        return `/assets/catalogs/${iconName}.png`
    }

    get categoryIcon() : string {
        let iconName = this.category.icon ?? "null";

        return `/assets/catalogs/${iconName}.png`
    }


    constructor(private categoryService: CategoryService, private walletService: WalletService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.categoryService.getAllCategory().pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    res.forEach(element => {
                        let categoryView = new CategoryView().addCategory(element)
                        if (categoryView.id === this.selectedCategoryId) {
                            categoryView.isCurrent = true;
                        }
                        this.categories.push(categoryView);
                    });

                },
                (err) => {
                    console.log(err)
                }
            )
    }
    
    onSelectParentCategory() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Select Category',
            nzClassName: "add-parent-category-modal",
            nzContent: PopupSelectCategoryComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                categories: this.categories,
                callbackFunc: (hasChooseCategory: boolean) => {
                    this.hasChooseCategory = hasChooseCategory
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: []
        });
        const instance = modal.getContentComponent()
        modal.afterClose.subscribe(result => {
            this.category.parent = instance.getCurrentCategory();
        });
    }

    onSelectIcon() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: 'Choose Icon',
            nzClassName: "add-icon-modal",
            nzContent: PopupSelectIconComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                choseIcon: this.category.icon,
                callbackFunc: (iconName: string) => {
                    this.category.icon = iconName
                    modal.destroy()
                }
            },
            nzWidth: 500,
            nzFooter: []
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
