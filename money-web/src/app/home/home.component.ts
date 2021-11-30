import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService, UserDetail } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _currentUser: UserDetail;
  get currentUser() {
    return this._currentUser;
  };

  private _currentPage!: string;
  get currentPage() {
    return this._currentPage;
  }

  isCollapsed: boolean = false;

  constructor(private authService: AuthService, private router: Router, private commonService: CommonService) {
    this._currentUser = jwtDecode(this.authService.userDetail.token);
  }

  ngOnInit(): void {
    this.commonService.currentPage.subscribe(page => {this._currentPage = page; console.log(this._currentPage)});
  }

  onSizebarCollapse(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }

}
