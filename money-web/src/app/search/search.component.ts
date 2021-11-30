import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Utils } from '../util/utils';
import { TransactionView } from '../view-model/transactions';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    transactionsByTime!: TransactionView[][];
    @Output() selectedTransaction = new EventEmitter<TransactionView>();
    inflow!: number;
    outflow!: number;
    @Input() isLoading: boolean = true;
    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.commonService.currentSearchResults.subscribe(transactions => { this.transactionsByTime = transactions; });
        this.commonService.currentInflow.subscribe(inflow => { this.inflow = inflow; });
        this.commonService.currentOutflow.subscribe(outflow => { this.outflow = outflow; });
    }

    selectTransaction(transaction: TransactionView) {
        this.selectedTransaction.emit(transaction);
        let dialog = document.getElementsByClassName('list-transaction') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('transaction-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "21%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }
    }

    calculateTotalAmount(transaction: TransactionView[]) {
        let total = 0;
        transaction.forEach(element => {
            if (element.category.isExpense) total -= element.amount;
            else total += element.amount;
        });
        return total;
    }

    getDate(date: string) {
        return Utils.getDate(date);
    }

    getFormatBalance(balance: number) {
        if (balance)
            return Utils.formatCurrency(balance);
        return '0';
    }

}
