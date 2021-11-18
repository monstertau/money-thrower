import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private page = new BehaviorSubject<string>('');
  private viewMode = new BehaviorSubject<string>('category');
  private month = new BehaviorSubject<string>('this');
  currentPage = this.page.asObservable();
  currentViewMode = this.viewMode.asObservable();
  currentMonth = this.month.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.page.next(this.router.url.split('?')[0].replace("/", '') || 'transaction');
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
}

export enum ViewMode {
  CAT = 'category',
  TRANS = 'transaction'
}
