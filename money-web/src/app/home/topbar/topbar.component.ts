import { Component, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ViewMode } from 'src/app/services/common.service';

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

  constructor(private eRef: ElementRef, private router: Router, private route: ActivatedRoute, private commonService: CommonService) {
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
  }

  ngOnInit(): void {
    this.commonService.currentViewMode.subscribe(mode => { this.currentMode = mode });
    this.commonService.currentPage.subscribe(page => { this.currentPage = page; });
    this.commonService.currentMonth.subscribe(month => { this.currentMonth = month });
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
    }
    else {
      this.currentMode = ViewMode.CAT;
      this.viewToolTip = "View by transaction";
      this.commonService.changeViewMode(this.currentMode);
    }
  }

}

