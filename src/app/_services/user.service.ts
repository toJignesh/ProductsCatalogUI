import { User } from './../models/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
