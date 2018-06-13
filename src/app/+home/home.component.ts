import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { EmbedVideoService } from 'ngx-embed-video';
import {YoutubeID} from "../dashlets/simpledashlets/index";
import { ModalDirective } from 'ngx-bootstrap';
import { NotificationService } from '../shared/utils/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
Name:String='';
videoSource:string = "https://www.youtube.com/embed/"+YoutubeID+"?enablejsapi=1";  
youtubeId = YoutubeID.toString();

  constructor(public auth: AuthService,private embedService: EmbedVideoService,private notificationService:NotificationService) {
    console.log(this.embedService.embed(this.videoSource));
    console.log(this.embedService.embed_youtube(this.youtubeId))
    this.auth.authState.subscribe((user)=>{
      if (user){
        this.Name=user.name;

      }
    })
   }
   @ViewChild('lgModal') public lgModal: ModalDirective;
   public showChildModal(): void {
     this.lgModal.show();
   }
   public hideChildModal(): void {
 
     this.lgModal.hide();
   }
   ShowHelp(){
    this.ShowHelpPopup()
    document.getElementById("myframe").setAttribute("src", this.videoSource);
   }
   ShowHelpPopup() {
    this.notificationService.smartMessageBox({
      title: "This is a demo to start with ",
      content: `  
      <iframe id="myframe"
      width="640" height="360"
      src=""
      frameborder="0"
      style="border: solid 4px #37474F"
></iframe>

      `,
      buttons: '[Hide]'

    }
  );
  }
  ngOnInit() {

    

  }

}
