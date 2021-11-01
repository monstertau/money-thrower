import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userDetail: BehaviorSubject<LoginResponse>;
  private _currentUser: Observable<LoginResponse>;
  get userDetail(): LoginResponse {
    return this._userDetail.value;
  }
  get currentUser(): Observable<LoginResponse> {
    return this._currentUser;
  }

  constructor(private httpService: HttpService) {
    this._userDetail = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this._currentUser = this._userDetail.asObservable();
  }

  register(data: RegisterRequest) {
    return new Observable<string>((observable) => {
      this.httpService.post<RegisterResponse>('auth/register', data).subscribe((response: RegisterResponse) => {
        if (!response) {
          observable.next('FAIL');
        }
        else if (response?.token) {
          var currentUser = {
            token: response.token,
          }
          this._userDetail = new BehaviorSubject<LoginResponse>(currentUser);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this._userDetail.next(response);
          observable.next('SUCCESS');
        }
      }, (error) => {
        observable.error(error);
      });
      return { unsubscribe() { } };
    })
  }

  login(data: any) {
    return new Observable<string>((observable) => {
      this.httpService.post<LoginResponse>('auth/login', data).subscribe((response: LoginResponse) => {
        if (response?.token === '') {
          observable.next('ERROR_NAME_OR_PASS');
        } else {
          var currentUser = {
            token: response.token,
          }
          this._userDetail = new BehaviorSubject<LoginResponse>(currentUser);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this._userDetail.next(response);
          observable.next('SUCCESS');
        }
      }, (error) => {
        observable.error(error);
      });
      return { unsubscribe() { } };
    });
  }
}

export interface UserDetail {
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
