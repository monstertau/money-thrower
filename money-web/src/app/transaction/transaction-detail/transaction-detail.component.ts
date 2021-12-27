import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonService } from 'src/app/services/common.service';
import {Transaction2, TransactionService} from 'src/app/services/transaction.service';
import {Utils} from 'src/app/util/utils';
import {TransactionView} from 'src/app/view-model/transactions';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
    @Input() transaction!: TransactionView;
    @Output() closed = new EventEmitter<boolean>();

    transactionDeleteLoading: boolean = false;

    showDeleteModal: boolean = false;

    constructor(private notification: NzNotificationService, private transactionService: TransactionService, private commonService: CommonService) {
    }

    ngOnInit(): void {
    }

    closeDetail() {
        this.closed.emit(true);
        let dialog = document.getElementById('transaction-detail') as HTMLElement;
        dialog.hidden = true;
        let dialogList = document.getElementsByClassName('list-transaction') as HTMLCollectionOf<HTMLElement>;
        if (dialogList.length > 0) {
            dialogList[0].style.marginLeft = '50%';
        }
    }

    getDate(date: string) {
        return Utils.getDate(date);
    }

    getFormatBalance(balance: number) {
        console.log(Utils.formatCurrency(balance));
        return Utils.formatCurrency(balance);
    }

    showTransactionDeleteModal() {
        this.showDeleteModal = true;
    }

    handleCancelDelete() {
        this.showDeleteModal = false;
    }

    handleDelete() {
        this.transactionDeleteLoading = true;
        this.deleteTransaction()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.transactionDeleteLoading = false;
                    this.showDeleteModal = false;
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.transactionDeleteLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async deleteTransaction() {
        let error = null;
        this.transactionService.deleteTransaction(this.transaction.id).subscribe(
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
