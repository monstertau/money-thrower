import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService, ViewMode} from 'src/app/services/common.service';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TransactionAddComponent} from "../../transaction-add/transaction-add.component";
import {WalletService} from "../../services/wallet.service";
import {WalletView} from "../../view-model/wallet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Utils} from "../../util/utils";
import {TransactionView} from "../../view-model/transactions";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnChanges {
  @Input() sidebarCollapse = false;
  isWalletMenuOpen = false;
  currentPage!: string;
  currentMode: string = ViewMode.CAT;
  currentMonth!: string;
  viewToolTip: string;

  private readonly destroy$ = new Subject();
  private _wallets: WalletView[] = [];

  get wallets() {
    return this._wallets;
  }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.isWalletMenuOpen) {
        this.isWalletMenuOpen = false;
        let dialog = document.getElementsByClassName('wallet-menu') as HTMLCollectionOf<HTMLElement>;
        dialog[0].hidden = !this.isWalletMenuOpen;
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.isWalletMenuOpen) {
      this.isWalletMenuOpen = false;
      let dialog = document.getElementsByClassName('wallet-menu') as HTMLCollectionOf<HTMLElement>;
      dialog[0].hidden = !this.isWalletMenuOpen;
    }
  }

  constructor(private walletService: WalletService, private modal: NzModalService, private viewContainerRef: ViewContainerRef, private eRef: ElementRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
    let mode: string = this.route.snapshot.queryParams['view'] || '';
    switch (mode) {
      case ViewMode.TRANS:
        this.currentMode = ViewMode.TRANS;
        this.viewToolTip = "View by " + ViewMode.CAT;
        break;
      default:
        this.currentMode = ViewMode.CAT;
        this.viewToolTip = "View by " + ViewMode.TRANS;
        break;
    }
    this.commonService.currentMonth.subscribe(month => {
      this.currentMonth = month
    });
  }

  ngOnInit(): void {
    this.commonService.currentViewMode.subscribe(mode => {
      this.currentMode = mode
    });
    this.commonService.currentPage.subscribe(page => { this.currentPage = page; });
    this.commonService.currentMonth.subscribe(month => { this.currentMonth = month });
    this.walletService.getWalletPaging(0, 100).pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log(res);
          res.forEach(element => {
            this._wallets.push(new WalletView().addWallet(element));
          });
          this._wallets[0].isCurrent = true;
        },
        (err) => {
          console.log(err)
        }
      )

  }

  ngOnChanges(changes: any) {
    if (changes.sidebarCollapse) {
      this.sidebarCollapse = changes.sidebarCollapse.currentValue;
      if (this.sidebarCollapse) {
        let dialog = document.getElementsByClassName('wallet-menu') as HTMLCollectionOf<HTMLElement>;
        dialog[0].style.left = "60px";
      } else {
        let dialog = document.getElementsByClassName('wallet-menu') as HTMLCollectionOf<HTMLElement>;
        dialog[0].style.left = "210px";
      }
    }
  }

  openWalletMenu() {
    this.isWalletMenuOpen = !this.isWalletMenuOpen;
    let dialog = document.getElementsByClassName('wallet-menu') as HTMLCollectionOf<HTMLElement>;
    dialog[0].hidden = !this.isWalletMenuOpen;
  }

  getFormatAmount(value: number): string {
    return Utils.formatNumber(value.toString())
  }

  getCurrentWallet(): WalletView {
    for (let wallet of this._wallets) {
      if (wallet.isCurrent) {
        return wallet;
      }
    }
    return new WalletView();
  }

  jumpToToday() {
    if (this.currentMonth != 'this') {
      this.commonService.reloadComponent();
      this.router.navigate(['/']);
    }
  }

  changeViewMode() {
    if (this.currentMode === ViewMode.CAT) {
      this.currentMode = ViewMode.TRANS;
      this.viewToolTip = "View by category";
      this.commonService.changeViewMode(this.currentMode);
    } else {
      this.currentMode = ViewMode.CAT;
      this.viewToolTip = "View by transaction";
      this.commonService.changeViewMode(this.currentMode);
    }
  }

  addTransaction() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'Add Transaction',
      nzClassName: "add-transaction-modal",
      nzContent: TransactionAddComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        transaction: new TransactionView().addWalletView(this.getCurrentWallet())
      },
      nzWidth: 848,
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
