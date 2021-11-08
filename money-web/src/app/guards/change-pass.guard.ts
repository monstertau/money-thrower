import { Injectable, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePassGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        const token: string = route.queryParams['token'];
        const email: string = route.queryParams['email'];
        console.log(this.checkTokenAndMail(token,email));
        return this.checkTokenAndMail(token,email);
    }

    checkTokenAndMail(token: string, email: string): boolean|any {
        var user = {
            email: email,
            token: token
        }

        this.authService.checkTokenAndMail(user).subscribe(result =>{
            console.log(result);
            if(!result){
              this.router.navigate(['/login']);
              window.location.href = '/login';
              return false;
            }
            else{
              alert('true'); 
              return true;
            }
        });
        //return true;
    }
}
