import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() collapse = new EventEmitter<boolean>();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.collapse.emit(false);  
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapse.emit(this.isCollapsed);
  }

  selectPage(page: string) {
    this.commonService.changePage(page);
  }
}
