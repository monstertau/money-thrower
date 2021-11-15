import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, UserDetail } from 'src/app/services/auth.service';
import { Wallet, WalletService } from 'src/app/services/wallet.service';


@Component({
    selector: 'app-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit, OnDestroy {

    @Output() editWallet = new EventEmitter<string>();
    walletList: Wallet[] = [];

    selectedWallet: Wallet = {
        id: "",
        name: "",
        type: 0,
        currency: "",
        balance: 0,
        icon: ""
    };

    private readonly destroy$ = new Subject();

    currentUser: UserDetail;

    pageSize: number = 10;

    pageOffset: number = 0;

    isListLoading: boolean = false;

    isDetailLoading: boolean = true;

    fallbackIcon = 'assets/catalogs/wallet_icon.png';

    get isListEmpty(): boolean {
        return this.walletList.length <= 0
    }

    constructor(private walletService: WalletService, private authService: AuthService) {
        this.currentUser = jwtDecode(this.authService.userDetail.token);
    }

    ngOnInit() {
        this.loadWalletList();
    }

    loadMore() {
        this.pageOffset += this.pageSize;
        this.loadWalletList;
    }
  
     editWalletDetail() {
        this.editWallet.emit();
    }

    loadWalletList() {
        this.isListLoading = true;
        this.walletService.getWalletPaging(this.pageOffset, this.pageSize)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    res.forEach(element => {
                        this.walletList.push(element);
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
                    this.selectedWallet = res;
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

    getIcon(icon: string) {
        return "assets/catalogs/" + icon + ".png";
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
