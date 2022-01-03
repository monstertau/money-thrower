import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonService} from 'src/app/services/common.service';
import {BudgetView} from 'src/app/view-model/budget';
import {WalletView} from "../../view-model/wallet";

@Component({
    selector: 'app-budget-detail',
    templateUrl: './budget-detail.component.html',
    styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {
    @Input() budget!: BudgetView;
    @Output() closed = new EventEmitter<boolean>();
    budgetClone!:BudgetView;


    showDeleteModal: boolean = false;
    showEditModal: boolean = false;
    showMoreDetail: boolean =false;
    budgetEditLoading = false;
    budgetDeleteLoading = false;

    constructor(private notification: NzNotificationService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.budgetClone = this.budget.clone();
    }

    closeDetail() {
        this.closed.emit(true);
        let dialog = document.getElementById('budget-detail') as HTMLElement;
        dialog.hidden = true;
        let dialogList = document.getElementsByClassName('list-budget') as HTMLCollectionOf<HTMLElement>;
        if (dialogList.length > 0) {
            dialogList[0].style.marginLeft = '50%';
        }
    }

    showBudgetDeleteModal() {
        this.showDeleteModal = true;
    }

    handleCancelDelete() {
        this.showDeleteModal = false;
    }

    handleDelete() {
        this.budgetDeleteLoading = true;
        this.deleteBudget()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.budgetDeleteLoading = false;
                    this.showDeleteModal = false;
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.budgetDeleteLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async deleteBudget() {
        // Todo: deleteBudget
    }

    handleCancelAdd() {
        this.showEditModal = false;
        if(JSON.stringify(this.budget) !== JSON.stringify(this.budgetClone)){
            this.budgetClone = this.budget.clone();
        }
    }

    moreDetailClick() {
        if (this.showMoreDetail == true) this.showMoreDetail = false;
        else this.showMoreDetail = true;
    }

    handleSave() {
        this.showEditModal = false;
        this.budgetEditLoading = true;
        this.editBudget()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.budgetEditLoading = false;
                    this.showEditModal = false;
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                console.log(error)
                this.showEditModal = false;
                this.showErrorMessage(error.toString())
            })
    }

    async editBudget() {
        // Todo: editBudget
    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

    showBudgetEditModal() {
        this.budget.category.isCurrent = true;
        this.showEditModal = true;
    }
}
