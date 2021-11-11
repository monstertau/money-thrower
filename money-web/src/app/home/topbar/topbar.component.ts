import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnChanges {
  @Input() sidebarCollapse = false;
  isWalletMenuOpen = false;

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

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
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

}
