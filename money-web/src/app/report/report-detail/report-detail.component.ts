import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-report-detail',
    templateUrl: './report-detail.component.html',
    styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
    @Output() closed = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }
    data:number[] = [1,2,3,4,5,6,7,8,9,10]

    hideReportDetail() {
        this.closed.emit(true);
        let dialog = document.getElementById('report-detail') as HTMLElement;
        dialog.hidden = true;
        let dialogList = document.getElementsByClassName('main-report') as HTMLCollectionOf<HTMLElement>;
        if (dialogList.length > 0) {
            dialogList[0].style.marginLeft = '50%';
            dialogList[0].style.width = "50%";
        }
    }
}
