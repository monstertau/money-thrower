import { Injectable, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePassGuard implements CanActivate {
    check: boolean = false;
    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        const token: string = route.queryParams['token'];
        const email: string = route.queryParams['email'];
        
        return this.checkTokenAndMail(token,email);
    }

    checkTokenAndMail(token: string, email: string): boolean {
        var user = {
            email: email,
            token: token
        }
        this.authService.checkTokenAndMail(user).subscribe(result =>{
            console.log(result);
            if(result == 'SUCCESS'){
                this.check = true;
            }
            else{
                this.check = false;  
            }
        });
        console.log(this.check);
        return this.check;
    }
}
