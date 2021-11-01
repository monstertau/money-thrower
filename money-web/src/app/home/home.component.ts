import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService, UserDetail } from '../services/auth.service';

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

  constructor(private authService: AuthService) { 
    this._currentUser = jwtDecode(this.authService.userDetail.token);
  }

  ngOnInit(): void {
  }

}
