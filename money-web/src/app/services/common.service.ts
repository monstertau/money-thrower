import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wallet, WalletService } from './wallet.service'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private page = new BehaviorSubject<string>('');
  private viewMode = new BehaviorSubject<string>('category');
  private month = new BehaviorSubject<string>('this');
  private wallet= new BehaviorSubject<string>('');
  currentPage = this.page.asObservable();
  currentViewMode = this.viewMode.asObservable();
  currentMonth = this.month.asObservable();
  currentWallet = this.wallet.asObservable();
  constructor(private router: Router, private walletService: WalletService) {
    this.page.next(this.router.url.split('?')[0].replace("/", '') || 'transaction');
    this.wallet = new BehaviorSubject<string>(localStorage.getItem('currentWallet') || '');
    if (this.wallet.value) this.currentWallet = this.wallet.asObservable();
    else {
      this.walletService.getWalletPaging(0, 1).subscribe(data => {
        this.wallet.next(data[0].id);
        localStorage.setItem('currentWallet', data[0].id);
        this.currentWallet = this.wallet.asObservable();
      });
    }
  }

  setCurrentWallet(id: string) {
    localStorage.removeItem('currentWallet');
    localStorage.setItem('currentWallet', id);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  changePage(page: string) {
    this.page.next(page);
  }

  changeViewMode(mode: string) {
    this.viewMode.next(mode);
  }

  changeMonth(month: string) {
    this.month.next(month);
  }

  changeWallet(id: string) {
    this.wallet.next(id);
    localStorage.removeItem('currentWallet');
    localStorage.setItem('currentWallet', id);
  }
}

export enum ViewMode {
  CAT = 'category',
  TRANS = 'transaction'
}
