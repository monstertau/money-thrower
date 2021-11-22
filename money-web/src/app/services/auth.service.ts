import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

    logout(data: any) {
        return this.httpService.post<LogoutResponse>('auth/logout', data).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
                }
                return throwError(error);
            })
        );
    }

  mailConfirm(data: MailConfirmRequest){
    return new Observable<string>((observable) => {
      this.httpService.post<MailConfirmResponse>('password/forgot', data).subscribe((response: MailConfirmResponse) => {
        if (response?.token === '') {
          observable.next('ERROR_NAME_OR_PASS');
        } else {
          observable.next('SUCCESS');
        }
      }, (error) => {
        observable.error(error);
      });
      return { unsubscribe() { } };
    });
  }
  checkTokenAndMail(data: CheckTokenAndMailRequest ){
    return new Observable<string>((observable) => {
      this.httpService.post<CheckTokenAndMailResponse>('password/validate', data).subscribe((response: CheckTokenAndMailResponse) => {
        if (response?.token === '') {
          observable.next('FAIL');
        } else {
          observable.next('SUCCESS');
        }
      }, (error) => {
        observable.error(error);
      });
      return { unsubscribe() { } };
    });
  }
  passChange(data: PassChangeRequest){
    return new Observable<string>((observable) => {
      this.httpService.post<PassChangeResponse>('password/change', data).subscribe((response: PassChangeResponse) => {
        if (response?.token === '') {
          observable.next('ERROR_NAME_OR_PASS');
        } else {
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

export interface LogoutResponse {}

export interface MailConfirmRequest {
  email: string;
}
export interface MailConfirmResponse{
  token: string;
}
export interface CheckTokenAndMailRequest{
  email: string;
  token: string;
}
export interface CheckTokenAndMailResponse{
  token: string;
}
export interface PassChangeRequest{
  email: string;
  password: string;
  token: string;
}
export interface PassChangeResponse{
  token: string;
}
