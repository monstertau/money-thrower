import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {WalletAddIconComponent} from "../wallet-add/wallet-add-icon/wallet-add-icon.component";
import {TransactionHistoryPopupComponent} from "../components/transaction-history-popup/transaction-history-popup.component";
import {ActivatedRoute, Params} from "@angular/router";
import {catchError, concatMap, map, takeUntil} from "rxjs/operators";
import {from, Observable, of, Subject} from "rxjs";
import {WalletService} from "../services/wallet.service";
import {TransactionService} from "../services/transaction.service";
import {CommonService} from "../services/common.service";
import * as moment from "moment";
import {Utils} from "../util/utils";
import {TransactionView} from "../view-model/transactions";
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {CategoryService} from "../services/category.service";
import {DataPoint, DataRange} from "../view-model/data-range";

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
    title!: string;
    dataRange!: DataRange;
    totalIncome:string = "0";
    totalOutcome:string = "0";
    totalDebt: string = "0";
    totalLoan: string = "0";
    otherInflow: string = "0";
    otherOutflow: string = "0";
    otherBalance: string ="0";
    private currentWalletId!: string;


    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef,
                public activatedRoute: ActivatedRoute, private walletService: WalletService,
                private transactionService: TransactionService, private commonService: CommonService,
                private categoryService: CategoryService) {
        this.commonService.currentWallet.subscribe(wallet => {
            this.currentWalletId = wallet;
        });
    }

    triggerShowPopup(title: string,startDate: Date, endDate: Date, dataRange: DataRange, type: string) {
        const modal: NzModalRef = this.modal.create({
            nzTitle: title,
            nzClassName: "debt-transaction-history",
            nzContent: TransactionHistoryPopupComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {startDate,endDate,dataRange,type},
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
            this.queryData(params.title, params.startDate, params.endDate);
        });

    }

    queryData(title: string, startDate: string, endDate: string) {
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
        this.allTransactions = [];
        this.transactionService.getTransactions(filter)
            .pipe( // pipeline for sequential call
                concatMap(transactions => {
                    if (transactions.length <= 0) {
                        throw 'Data not found';
                    }
                    return from(transactions)
                }),
                concatMap(transaction => {
                    let transactionView: TransactionView = new TransactionView().addTransaction(transaction);
                    transactionView.category.id = transaction.cat_id;
                    return this.categoryService.getCategoryById(transactionView.category.id).pipe(
                        map(category => {
                                return transactionView.addCategory(category)
                            }
                        )
                    );
                }),
                concatMap(transactionView => {
                        return this.walletService.getWalletById(this.currentWalletId).pipe(
                            map(data => {
                                return transactionView.addWallet(data);
                            })
                        );
                    }
                ),
                map(transactionView => {
                    this.allTransactions.push(transactionView);
                }),
                catchError((error) => of(error))
            ).subscribe(() => {
            this.startDate = moment(startDate, "DD/MM/YYYY").toDate();
            this.endDate = moment(endDate, "DD/MM/YYYY").toDate();
            this.title = title;
            this.dataRange = new DataRange(this.title, this.startDate, this.endDate, this.allTransactions);
            setTimeout(() => {
                this.isLoading = false;
            }, 3000);
            this.totalIncome = Utils.formatCurrency(this.dataRange.totalIncome)
            this.totalOutcome = Utils.formatCurrency(-this.dataRange.totalOutcome)
            this.totalDebt = Utils.formatCurrency(this.dataRange.totalDebt)
            this.totalLoan = Utils.formatCurrency(-this.dataRange.totalLoan)
            this.otherInflow = Utils.formatCurrency(this.dataRange.otherInflow)
            this.otherOutflow = Utils.formatCurrency(-this.dataRange.otherOutflow)
            this.otherBalance = Utils.formatCurrency(this.dataRange.otherInflow-this.dataRange.otherOutflow);
                
            
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
    showOutcomeDetail() {
        let dialog = document.getElementsByClassName('main-report') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('outcome-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '19%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "19%";
            dialog[0].style.width = "40%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }
    }
    showIncomeDetail() {
        let dialog = document.getElementsByClassName('main-report') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('income-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '19%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "19%";
            dialog[0].style.width = "40%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }
    }
}
