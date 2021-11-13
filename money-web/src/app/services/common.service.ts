import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private viewMode = new BehaviorSubject<string>('category');
  private month = new BehaviorSubject<string>('this');
  currentViewMode = this.viewMode.asObservable();
  currentMonth = this.month.asObservable();

  constructor(private router: Router) { }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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
