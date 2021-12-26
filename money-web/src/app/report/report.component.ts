import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {WalletAddIconComponent} from "../wallet-add/wallet-add-icon/wallet-add-icon.component";
import {TransactionHistoryPopupComponent} from "../components/transaction-history-popup/transaction-history-popup.component";
import {ActivatedRoute, Params} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {WalletService} from "../services/wallet.service";
import {TransactionService} from "../services/transaction.service";
import {CommonService} from "../services/common.service";
import * as moment from "moment";
import {Utils} from "../util/utils";
import {TransactionView} from "../view-model/transactions";
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {CategoryService} from "../services/category.service";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    private destroy$ = new Subject();
    isLoading: boolean = true;
    startDate: Date = new Date();
    endDate: Date = new Date();
    startBalance: string = "0";
    endBalance: string = "0";
    netBalance: string = "0";
    allTransactions: TransactionView[] = [];
    private currentWalletId!: string;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef,
                public activatedRoute: ActivatedRoute, private walletService: WalletService,
                private transactionService: TransactionService, private commonService: CommonService,
                private categoryService: CategoryService) {
        this.commonService.currentWallet.subscribe(wallet => {
            this.currentWalletId = wallet;
        });
    }

    triggerShowPopup(title: string) {
        const modal: NzModalRef = this.modal.create({
            nzTitle: title,
            nzClassName: "debt-transaction-history",
            nzContent: TransactionHistoryPopupComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {},
            nzBodyStyle: {
                "padding": "0",
            },
            nzWidth: 500,
            nzFooter: []
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
            this.isLoading = true;
            this.queryData(params.startDate, params.endDate);
            setTimeout(() => {
                this.isLoading = false;
            }, 200);
            this.startDate = moment(params.startDate, "DD/MM/YYYY").toDate();
            this.endDate = moment(params.endDate, "DD/MM/YYYY").toDate();
        })
    }

    queryData(startDate: string, endDate: string) {
        const start = moment(startDate, "DD/MM/YYYY").format("x");
        const end = moment(endDate, "DD/MM/YYYY").format("x");
        this.walletService.getWalletBalance(this.currentWalletId, parseInt(start), parseInt(end))
            .subscribe(balance => {
                this.startBalance = Utils.formatCurrency(balance.start_balance);
                this.endBalance = Utils.formatCurrency(balance.end_balance);
                this.netBalance = Utils.formatCurrency(balance.end_balance - balance.start_balance);
            })
        const filter = {
            cat_id: "",
            end_amount: 0,
            start_amount: 0,
            start_date: parseInt(start),
            end_date: parseInt(end),
            key_note: "",
            wallet_id: this.currentWalletId,
        }
        this.transactionService.getTransactions(filter).subscribe(transactions => {
            transactions.forEach(transaction => {
                let transactionView: TransactionView = new TransactionView().addTransaction(transaction);
                transactionView.category.id = transaction.cat_id;
                this.getCategory(transactionView);
                this.getWallet(transactionView);
                this.allTransactions.push(transactionView);
            })
        })
    }

    getWallet(transaction: TransactionView) {
        this.walletService.getWalletById(this.currentWalletId).subscribe(
            data => {
                transaction.addWallet(data);
            }
        );
    }

    getCategory(transaction: TransactionView) {
        this.categoryService.getCategoryById(transaction.category.id).subscribe(data => {
            transaction.addCategory(data);
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    showDetail() {
        let dialog = document.getElementsByClassName('main-report') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('report-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '19%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "19%";
            dialog[0].style.width = "40%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }
    }
}
