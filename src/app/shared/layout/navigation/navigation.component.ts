import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as AllDashboards from "../../../dashboards/dashboardList";
import {  data, TestdashComponent } from '../../../dashboards/testdash/testdash.component';
import { DataService } from "../../../dashlets/dashletbase/dataservice.service";
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router  } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { NavigationStart } from '@angular/router';
import { NotificationService } from '../../utils/notification.service';
import 'rxjs/add/operator/take';
declare var $: any;
@Component({
  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  userData0: data;
  pages: AllDashboards.Dashboard[] = [];
  SharedPages: any[any] = [];
  newname: string = "default";
  CurrentUser: number;
  user: IUser;
  constructor(private _dataService: DataService, public router: Router,
    private authService: AuthService, public route: ActivatedRoute,
    private notificationService: NotificationService) {
  }
  private routeSub: any;
  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  @ViewChild('lgModal') public lgModal: ModalDirective;
  public showChildModal(): void {
    this.lgModal.show();
  }
  public hideChildModal(): void {
    this.lgModal.hide();
  }
  showAddPagePopup(name) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-trash-o'></i>  Add a new dashboard <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content: `  Give it a name
    <div class="form-group">
              <label for="name"> Name</label>
              <input type="text" #name  id="name" required  style="color:black;">
              <button  (click)="AddNewPage(name.value)"  >Add New Page</button>
            </div> 
            


    `,
      buttons: '[No][Create]',

    }, (ButtonPressed) => {
      if (ButtonPressed == "Create") {
        this.AddNewPage(name)

      }
    });
  }
  GetPagesByUser(UserID) {
    var sub: Subscription
    sub = this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      var i;
      this.pages = [];
      for (let index = 0; index < data.length; index++) {
        this.pages[index] = (new AllDashboards.Dashboard(data[index].id, data[index].name));
        AllDashboards.ListAll[index] = (new AllDashboards.Dashboard(data[index].id,
          data[index].name));
      }
    });
  }
  ChangeOldUser(id: number, data: string) {
    var obj: any;
    this._dataService.GetUser(id).subscribe((user: any) => {
      this.user = user;
      this.user.data = data;
      obj = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "data": data
      };
      this._dataService.update(obj, id).subscribe();
      console.log('obj to send', obj);
    });

  }
  AddPage(UserID, Page) {
    this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      data.push(Page);
      var DataString: string = JSON.stringify(data);
      this._dataService.ChangeOldUser(UserID, DataString);
    });
  }
  AddNewPage(newname) {
    var id: number = 1;
    for (let index = 0; index < this.pages.length; index++) {
      if (this.pages[index].id == id) {
        id++;
      }
    }
    this.pages.push(new AllDashboards.Dashboard(id, newname))
    AllDashboards.ListAll.push(new AllDashboards.Dashboard(id, newname))
    let page = {
      "id": id,
      "name": newname,
      "items": []
    }
    this.AddPage(this.CurrentUser, page);
  }
  GetSharedPages(id) {
    this._dataService.GetMySharedPages(id).subscribe((list) => {
      console.log('my shared pages', JSON.parse(list.text()));
      this.SharedPages = JSON.parse(list.text())
      for (let index = 0; index < this.SharedPages.length; index++) {
        AllDashboards.GSharedPages.push(new AllDashboards.SharedDashboard(this.SharedPages[index].userid, this.SharedPages[0].pageid));

      } console.log('see this', AllDashboards.GSharedPages)

    });
  }
  ShowSharedPage(pageid, userid) {
    let navigationExtras: NavigationExtras = {
      queryParams: { UserID: userid, PageID: pageid },
      fragment: 'anchor'
    };
    this.router.navigate(['/home/dashboards/sharedpage/'
      , { UserID: userid, PageID: pageid }
    ]);
  }

  DeleteSharedPage() {
    this.route.params.take(1).subscribe((params: any) => {
      let userId = params['UserID'];
      console.log(userId);
    });
  }

  showDeleteSharedPagePopup() {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-trash-o'></i>  Delete this Dashboard <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content: `  Are you sure you want to delete this shared page
  
      `,
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Yes") {
        this.DeleteSharedPage()

      }
    });
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user == null) {
        this.router.navigateByUrl('/login');
      }
    })
    this._dataService.GetUserID().subscribe((id) => {
      this.CurrentUser = +id.text();
      this.GetPagesByUser(+id.text());
      this.GetSharedPages(+id.text())

    })

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {

        this.GetPagesByUser(this.CurrentUser)

        console.log('pages updated')

      }
    });


  }
}
export interface IUser {
  id: number;
  name: string,
  email: string,
  password: string,
  data: string
}