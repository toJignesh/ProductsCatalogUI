import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/api/signin',
      { username: username, password: password })
      .pipe(
            map(user => {
              if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return user;
            }
        )
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
