import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
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
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnChanges {
  @Input() sidebarCollapse = false;
  isWalletMenuOpen = false;
  currentPage!: string;

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

  constructor(private walletService: WalletService, private eRef: ElementRef, private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.currentPage.subscribe(page => { this.currentPage = page; });
    this.walletService.getWalletPaging(0, 100).pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
