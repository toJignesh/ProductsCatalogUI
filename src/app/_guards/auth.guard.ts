import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('currentUser')){
        //console.log('currentUser', localStorage.getItem('currentUser'));
        return true;
      }
console.log('it is redirecting from here');
      this.router.navigate(['login'],{queryParams:{returnUrl:state.url}});
      return false;
  }
}
