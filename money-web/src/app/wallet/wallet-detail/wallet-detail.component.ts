import {Component, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService, UserDetail} from 'src/app/services/auth.service';
import {CommonService} from 'src/app/services/common.service';
import {Wallet, WalletService} from 'src/app/services/wallet.service';
import {WalletView} from 'src/app/view-model/wallet';


@Component({
    selector: 'app-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit, OnDestroy {

    @Output() editWallet = new EventEmitter<WalletView>();
    walletList: WalletView[] = [];
    data: WalletView[] = [];

    selectedWallet = new WalletView();

    private readonly destroy$ = new Subject();

    currentUser: UserDetail;

    pageSize: number = 4;

    pageOffset: number = 0;

    isListLoading: boolean = false;

    isDetailLoading: boolean = true;

    walletDeleteLoading: boolean = false;

    showDeleteModal: boolean = false;

    canLoadMore: boolean = true;

    fallbackIcon = 'assets/catalogs/wallet_icon.png';

    get isListEmpty(): boolean {
        return this.walletList.length <= 0
    }

    constructor(private walletService: WalletService, private authService: AuthService, private notification: NzNotificationService, private commonService: CommonService) {
        this.currentUser = jwtDecode(this.authService.userDetail.token);
    }

    ngOnInit() {
        this.loadWalletList();
        this.data = this.walletList;
    }

    loadMore() {
        this.pageOffset += this.pageSize;
        this.loadWalletList();
    }

    editWalletDetail() {
        this.editWallet.emit(this.selectedWallet);
    }

    loadWalletList() {
        this.isListLoading = true;
        this.walletService.getWalletPaging(this.pageOffset, this.pageSize)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    if (!res || res.length <= 0) {
                        this.canLoadMore = false;
                    }
                    res.forEach(element => {
                        this.walletList.push(new WalletView().addWallet(element));
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

    loadWalletDetail(id: string) {
        this.isDetailLoading = true;
        this.walletService.getWalletById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    this.selectedWallet = new WalletView().addWallet(res);
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    this.isDetailLoading = false;
                }
            )
    }

    selectWallet(id: string) {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
            dialog[0].style.marginLeft = "21%";
            setTimeout(() => {
                dialogDetail.hidden = false;
            }, 500);
        }

        this.loadWalletDetail(id);
    }

    hideWalletDetail() {
        let dialog = document.getElementsByClassName('dialog') as HTMLCollectionOf<HTMLElement>;
        let dialogDetail = document.getElementById('dialog-detail') as HTMLElement;
        if (dialog.length != 0 && dialog[0].style.marginLeft == '21%' && !dialogDetail.hidden) {
            dialog[0].style.marginLeft = "50%";
            dialogDetail.hidden = true;
        }
    }

    formatCurrency(balance: number) {
        return balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    showWalletDeleteModal() {
        this.showDeleteModal = true;
    }

    handleCancelDelete() {
        this.showDeleteModal = false;
    }

    handleDelete() {
        this.walletDeleteLoading = true;
        this.deleteWallet()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.walletDeleteLoading = false;
                    this.showDeleteModal = false;
                    this.commonService.reloadComponent();
                }, 1000)

            })
            .catch(error => {
                this.walletDeleteLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async deleteWallet() {
        let error = null;
        this.walletService.deleteWallet(this.selectedWallet.id).subscribe(
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
