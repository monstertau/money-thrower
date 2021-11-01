import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.core_api;

  constructor(protected router: Router,
    protected http: HttpClient) { }

  get<T>(route: string, httpOptions?: object): Observable<T> {
    return this.http.get<T>(this.baseUrl + route, httpOptions);
  }

  post<T>(route: string, data: any, httpOptions?: object): Observable<T> {
    return this.http.post<T>(this.baseUrl + route, data, httpOptions);
  }

  put<T>(route: string, data: any, httpOptions?: object): Observable<T> {
    return this.http.put<T>(this.baseUrl + route, data, httpOptions);
  }

  delete<T>(route: string, id: number, httpOptions?: object): Observable<T> {
    const url = `${route}/${id}`;
    return this.http.delete<T>(this.baseUrl + url, httpOptions);
  }
}
