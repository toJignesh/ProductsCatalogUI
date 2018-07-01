import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../models/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      if(user.token){
        return true;
      }
    }
    return false;
  }

  getLoggedInUser(): User{
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return user;
    }
    return null;
  }

  getUserProfileFromDb():Observable<any>{
    return this.http.get('/api/user');
  }

  saveProductSearches(searches: string):void{
    this.http.patch('/api/user/save-product-searches',{'savedSearches': searches})
    .subscribe();
  }

  
}
