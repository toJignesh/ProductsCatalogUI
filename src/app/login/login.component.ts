import { User } from './../models/User';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private returnUrl:string;
private showLoginError: boolean=false;

  constructor(private authService: AuthenticationService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('returnURL',this.returnUrl);
  }

  loginSubmit(f: NgForm){
    this.authService.login(f.value.username, f.value.password)
      .subscribe(
        (loggedInUser: User)=>{
          console.log(this.returnUrl);

          this.router.navigate([this.returnUrl])
        },
        error=>{
          console.log('username or password is not correct');
          this.showLoginError=true;
        }
      )
  }

}
