import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonService, ViewMode } from 'src/app/services/common.service';
import { TransactionAddComponent } from 'src/app/transaction-add/transaction-add.component';
import { Utils } from 'src/app/util/utils';
import { TransactionView } from 'src/app/view-model/transactions';
import { WalletView } from 'src/app/view-model/wallet';

@Component({
  selector: 'app-topbar-transaction',
  templateUrl: './topbar-transaction.component.html',
  styleUrls: ['./topbar-transaction.component.css']
})
export class TopbarTransactionComponent implements OnInit {
  currentPage!: string;
  currentMode: string = ViewMode.CAT;
  currentMonth!: string;
  viewToolTip: string;

  @Input() wallets: WalletView[] = [];

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
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
  }

  getFormatAmount(value: number): string {
    return Utils.formatNumber(value.toString())
  }

  getCurrentWallet(): WalletView {
    for (let wallet of this.wallets) {
      if (wallet.isCurrent) {
        return wallet;
      }
    }
    return new WalletView();
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
          onClick: componentInstance =>{
              componentInstance!.addTransaction()
          }
        },
      ]
    });

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

}
