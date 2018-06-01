import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";
import { AuthService } from 'angularx-social-login';
declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public isUserLoggedIn: boolean;
  user:any
  constructor(private router: Router,private authService: AuthService,private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user != null) {
this.user=user;
console.log(user.photoUrl)
      }
    })
  }

showPopup(){
this.notificationService.smartMessageBox({
title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
content : "You can improve your security further after logging out by closing this opened browser",
buttons : '[No][Yes]'

}, (ButtonPressed) => {
if (ButtonPressed == "Yes") {
this.logout()

}
});
}

logout(){
  this.authService.signOut().then(res => {this.router.navigate(['login'])});

}
}
