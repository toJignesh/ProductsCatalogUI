import { SavedSearchService } from './../_services/saved-search.service';
import { User } from './../models/User';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private returnUrl:string;
private showLoginError: boolean=false;
loading: boolean=false;

  constructor(private authService: AuthenticationService,
              private router:Router,
              private route:ActivatedRoute,
            private userService: UserService,
          private savedSearchService:SavedSearchService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('returnURL',this.returnUrl);
  }

  loginSubmit(f: NgForm){
    this.loading = true;

    this.authService.login(f.value.username, f.value.password)
      .subscribe(
        (loggedInUser: User)=>{
          console.log(this.returnUrl);
          this.userService.getUserProfileFromDb()
             .pipe(
               map(p=>p.savedSearches)
             )
            .subscribe(d=>{
              localStorage.setItem('my-searches',d);
              this.savedSearchService.savedSearches.next(JSON.parse(d));
            }
          );

          // go to destination page
          this.router.navigate([this.returnUrl])
        },
        error=>{
          console.log('username or password is not correct');
          this.showLoginError=true;
          this.loading =false;
        }
      )
  }

}
