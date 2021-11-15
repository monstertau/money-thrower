import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  selectTransaction() {
    let dialog = document.getElementsByClassName('list-transaction') as HTMLCollectionOf<HTMLElement>;
    let dialogDetail = document.getElementById('transaction-detail') as HTMLElement;
    if (dialog.length != 0 && dialog[0].style.marginLeft != '21%' && dialogDetail.hidden) {
      dialog[0].style.marginLeft = "21%";
      setTimeout(() => {
        dialogDetail.hidden = false;
      }, 500);
    }
  }

}
