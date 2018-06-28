import { Component, OnInit, ViewChild, Injectable, Input, OnChanges, SimpleChanges, SimpleChange, HostListener, OnDestroy } from '@angular/core';
import { DashboardGridsterConfigService } from './dashboard-gridster-config.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { NotificationService } from "../../shared/utils/notification.service";
import * as AllDashboards from '../dashboardList';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from "../../dashlets/dashletbase/dataservice.service";
import { GridsterItemIndex } from "../../dashlets/dashletbase/gridsteritem";
import { Subscription } from 'rxjs/Subscription';
import { } from "module";
import { SelfalertComponent } from "../../selfalert/selfalert.component";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../alert/alert.service';
import { Library } from '../../dashlets/simpledashlets'
import { AuthService } from 'angularx-social-login';
declare var $: any;
import { ComponentCanDeactivate } from './guard';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';
@Component({
  selector: 'app-testdash',
  templateUrl: './testdash.component.html',
  styleUrls: ['./testdash.component.css'],
})
@Injectable()
export class TestdashComponent implements OnChanges, OnInit, ComponentCanDeactivate, OnDestroy {
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true
  }
  Sharing: boolean = false;
  Listwidgets: widget[] = [];
  listitemindex: GridsterItemIndex;
  CurrentPageID: number;
  found: boolean;
  userData0: data;
  userPage: PageEntity;
  pageItems: ItemsEntity;
  ListAfterEdit: Array<GridsterItem>;
  public ListBeforEdit: GridsterItem[];
  list: Array<any>
  errorMsg: string;
  config: GridsterConfig;
  currentID: number;
  isButtonVisible: boolean = true
  sub: Subscription;
  @Input() ActiveUserID: number;
  Allpages: AllDashboards.Dashboard[] = AllDashboards.ListAll;
  pagesAfterDelete: string;
  public DefaultItems: Array<GridsterItem> = [];
  public items: Array<GridsterItem>;
  itemvalue: Component;
  MyEmail: String;
  @Input() DataForSave: string;
  constructor(public route: ActivatedRoute, public router: Router,
    public dashboardGridsterConfigService: DashboardGridsterConfigService,
    private alertService: AlertService,
    public _dataService: DataService, private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private notificationService: NotificationService) { }

  @ViewChild('lgModal') public lgModal: ModalDirective;
  public showChildModal(): void {
    this.lgModal.show();
  }
  public hideChildModal(): void {

    this.lgModal.hide();
  }

  ngOnDestroy() {
    console.log('saved')
    this.Save();
  }

  ngOnChanges(changes: SimpleChanges) {
    const DataForSave: SimpleChange = changes.name;
  }

  GetWidgetsFromIndex() {
    var widgets: widget[] = [];
    for (let index = 0; Library[index] != null; index++) {
      widgets.push(
        new widget(Library[index].component, Library[index].name, Library[index].icon));
    }
    return widgets;
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.items.splice(this.items.indexOf(item), 1);
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }

  showDeletePagePopup() {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-trash-o'></i>  Delete this Dashboard <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content: `  Are you sure you want to delete this page
  
      `,
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Yes") {
        this.DeletePage()

      }
    });
  }

  RemoveWidgetFromPage(UserID, pageId, Item) {
    this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      var find: boolean = false;
      var i: number = 0;
      for (let index = 0; index < data.length && find == false; index++) {
        if (data[index].id == pageId) { find = true; i = index; }
      }
      data[i].items.splice(this.items.indexOf(Item) + 1, 1);
      var DataString: string = JSON.stringify(data);
      this._dataService.ChangeOldUser(UserID, DataString);
    });
  }

  DeleteWidget(item, $event) {
    var x: number = this.items.indexOf(item)
    $event.preventDefault();
    $event.stopPropagation();
    this.items.splice(x, 1);
    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this.RemoveWidgetFromPage(this.ActiveUserID, currentParam, item);
      this.Save();
    });

    Sub.unsubscribe();
  }

  AddItemToPage(UserID, pageId, newItem) {
    this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      var find: boolean = false;
      var i: number = 0;
      for (let index = 0; index < data.length && find == false; index++) {
        if (data[index].id == pageId) { find = true; i = index; }
      }
      data[i].items.push(newItem);
      var DataString: string = JSON.stringify(data);
      this._dataService.ChangeOldUser(UserID, DataString);
    });
  }

  UpdateItemOldData(data: string, i: number) {
    this.items[i].OldData = data;

  }

  addwidget(component, name, id) {
    var itemToPush: GridsterItem;
    this.items.push({ cols: 3, rows: 4, widget: component, name: name, pageID: id });
    let item = {
      "cols": 3,
      "rows": 5,
      "name": name,
      "id": this.GetWidgetID(name),
      "x": 0,
      "y": 0,
      "OldData": ''
    }
    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this.AddItemToPage(this.ActiveUserID, currentParam, item);
    });

    Sub.unsubscribe();

  }

  GetWidgetID(widget) {
    var find: boolean = false;
    var i: number = 0;
    for (let index = 0; index < this.Listwidgets.length && find == false; index++) {
      if (this.Listwidgets[index].id == widget) { find = true; i = index }

    } return i + 1;
  }

  LoadItems(listloaded) {
    for (let i = 0; i < listloaded.length; i++) {
      var x = this.find_widget_by_index(listloaded[i].name, this.Listwidgets);
      listloaded[i].widget = x;
    }
    this.ListAfterEdit = listloaded;
    return listloaded;
  }

  find_widget_by_index(index, list) {
    var found: boolean;
    found = false;
    for (let i = 0; i < list.length && found == false; i++) {
      if (list[i].id === index) {
        found = true;
        return list[i].widgetcomponent;
      }
    }
  }

  GetItemsByPage(id, pages) {
    var find: boolean = false;
    var i: number = 0;
    for (let index = 0; index < pages.length && find == false; index++) {
      if (pages[index].id == id) { find = true; i = index; }
    }
    if (pages != null) {
      console.log('test here', pages)
      return pages[i].items;

    }
    else return this.DefaultItems;
  }

  onStart(UserId, PageID) {
    this._dataService.GetPagesByUserID(UserId)
      .subscribe((data: data) => {
        this.userData0 = data;
        if (data) {
          this.ListBeforEdit = this.GetItemsByPage(PageID, data);
          this.LoadItems(this.ListBeforEdit);
          this.items = this.ListAfterEdit;
        }
        else { this.items = [] }
        console.log(this.items);
      });
  }

  getParam() {
    this.route.params.subscribe(data => {
      console.log(data.snapshot.paramMap.get('id') - 1);
      return data.snapshot.paramMap.get('id') - 1;
    });
  }

  DeletePageFromData(PageId, UserID) {
    var pages: string
    this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      var DataString = JSON.stringify(data);
      console.log('before delete', data);
      var index: number = data.map(function (e) { return e.id; }).indexOf(PageId)

      if (index > -1) {
        data.splice(index, 1);
      }
      var find: boolean = false;
      var i: number = 0;
      for (let index = 0; index < AllDashboards.ListAll.length, find == false; index++) {
        if (AllDashboards.ListAll[index].id == PageId) { find = true; }

      }
      AllDashboards.ListAll.splice(index, 1);
      this.pagesAfterDelete = JSON.stringify(data);
      console.log('this', this.pagesAfterDelete);
      this._dataService.ChangeOldUser(UserID, this.pagesAfterDelete);
    });
  }

  DeletePage() {
    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this.DeletePageFromData(currentParam, this.ActiveUserID);
    });
    Sub.unsubscribe();
    this.router.navigate(['']);
  }
  SaveFterDelete() {
    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this.SaveDashboardState(this.ActiveUserID, currentParam, this.items)
    });
    Sub.unsubscribe();
  }
  Save() {

    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this.SaveDashboardState(this.ActiveUserID, currentParam, this.items)
    });
    Sub.unsubscribe();
  }

  SaveDashboardState(UserID, pageId, UpdatedItems) {
    this._dataService.GetPagesByUserID(UserID).subscribe((data: any) => {
      this.userData0 = data;
      var find: boolean = false;
      var i: number = 0;
      for (let index = 0; index < data.length && find == false; index++) {
        if (data[index].id == pageId) { find = true; i = index; }
      }
      data[i].items = UpdatedItems;
      var DataString: string = JSON.stringify(data);
      console.log(UpdatedItems);
      this._dataService.ChangeOldUser(UserID, DataString);
    });
    this.success('Dashboard saved successfully');
    this.route.params.take(1).subscribe((params: any) => {
      let userId = params['UserID'];
      console.log(userId);
    });

  }

  SharePage(email) {
    this.authService.authState.subscribe((user) => {
      this.MyEmail = user.email;
      if (email != this.MyEmail) {
        this._dataService.GetUserByEmail(email).subscribe((data) => {


          this.ShareCurrentPage(email, user.name)
        },
          (error) => { this.error('Enter a valide email') }

        )

      } else this.error('You can not share this with your self')

    })
  }

  ShareCurrentPage(email, username) {
    var currentParam: number;
    var Sub: Subscription = this.route.params.subscribe(param => {
      currentParam = +this.route.snapshot.paramMap.get('id');
      this._dataService.GetUserID();
      var ddd: string
      var mmm: string
      var date: string
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      if (dd < 10) {
        ddd = ('0' + dd).toString()
      }

      if (mm < 10) {
        mmm = '0' + mm
      }

      date = mm + '/' + dd + '/' + yyyy;
      console.log('date :', date)
      let obj =
      {
        "pageid": currentParam,
        "userid": this.ActiveUserID,
        "username": username,
        "date": date
      }

      this._dataService.SharePageByUserID(email, obj)



      this.success('Dashboard Shared successfully with  ' + username);
    });
    Sub.unsubscribe();

  }

  ngOnInit() {


    this.spinnerService.show();

    this.Listwidgets = this.GetWidgetsFromIndex()
    this.route.params.subscribe(data => {
      console.log('test', this.items);
      this.Sharing = this.route.snapshot.data[0]['Sharing'];
      console.log('Sharing : ', this.Sharing)
      if (this.Sharing == false) {
        this._dataService.GetUserID().subscribe((id) => {
          this.onStart(+id.text(), +this.route.snapshot.paramMap.get('id'));
          this.ActiveUserID = +id.text()
        })
      }
      else if (this.Sharing == true) {
        this.isButtonVisible = false
        this.onStart(+this.route.snapshot.paramMap.get('UserID'),
          +this.route.snapshot.paramMap.get('PageID'));
      }
      this.CurrentPageID = +this.route.snapshot.paramMap.get('id');
      console.log('test after', this.items)
    });
    this.config = this.dashboardGridsterConfigService.getConfig();
    console.log('test ', AllDashboards.GSharedPages)
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);

  }
}

export class widget {
  widgetcomponent: any;
  id: string;
  icon: string
  constructor(c: any, i: string, icon: string) {
    this.widgetcomponent = c;
    this.id = i;
    this.icon = icon
  }
}
export interface user {
  id: number;
  name: string,
  email: string,
  password: string,
  data: data
}
export interface data {
  page?: (PageEntity)[] | null;
}
export interface PageEntity {
  id: number;
  name: string
  items?: GridsterItem[] | null;
}
export interface ItemsEntity {
  cols: number;
  rows: number;
  name: string;
  id: number;
  x: number;
  y: number;
}