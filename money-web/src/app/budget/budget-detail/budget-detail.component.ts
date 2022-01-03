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


    showDeleteModal: boolean = false;
    showEditModal: boolean = false;
    budgetEditLoading = false;

    constructor(private notification: NzNotificationService, private commonService: CommonService) {
    }

    ngOnInit(): void {
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

    showBudgetEditModal() {
        this.budget.category.isCurrent = true;
        this.showEditModal = true;
    }
}
