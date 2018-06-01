import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";
import { AuthService } from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:any;

  constructor(
    private authService: AuthService,private route:Router) {
  }

  ngOnInit() {
  
    this.authService.authState.subscribe((user) => {
      if (user != null) {
this.user=user;
console.log(user.photoUrl)
      }
    })
  }

  gohome(){
    this.route.navigateByUrl('/')

  }

}
