import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';
import { GridsterComponent } from 'angular-gridster2';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GridsterItemIndex } from "../dashletbase/gridsteritem";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { DashboardGridsterConfigService } from '../../dashboards/testdash/dashboard-gridster-config.service';
//import { resolveToFunctionSelector } from '@angular-redux/store/lib/src/components/selectors';
import { ListWidgetsByDashboardId } from '../../dashboards/dashboardList';
import { catchError, map, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/edge';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class DataService {
	private actionUrl: string;
	queryUrl: string = '?search=';
	UserURL: string = 'http://localhost:53760/api/users/'
	AccountsURL: string = 'http://localhost:53760/api/Accounts/'
	dataURL: string = 'http://localhost:53760/api/data/'
	SharedDashboardsURL: string = 'http://localhost:53760/api/SharedDashboards/'

	constructor(private http: Http, private httpclient: HttpClient,
		private dashboardGridsterConfigService: DashboardGridsterConfigService, private authService: AuthService) { }
	userdata: data;

	GetUserID(): Observable<any> {
		var UserID;
		var mail: string;
		this.authService.authState.subscribe((user) => {
			if (user) {
				console.log('user email', user.email);
				mail = user.email;
			}
		}); return this.GetUserByEmail(mail)
	}

	public update(obj: IUser, id: number): Observable<any> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json')
		return this.http.put(this.UserURL + id, JSON.stringify(obj), { headers: headers })
			.map(() => obj)
			.do(data => console.log('updated: ' + JSON.parse(JSON.stringify(data || null))));
	}

	ChangeOldUser(id: number, data: string) {
		var obj: any;
		this.GetUser(id).subscribe((user: any) => {

			obj = {
				"id": user.id,
				"name": user.name,
				"email": user.email,
				"password": user.password,
				"data": data,
				"shared": user.shared
			};
			this.update(obj, id).subscribe();
			console.log('obj to send', obj);
		});
	}
	public handleError(error: HttpErrorResponse) {
		
		  // A client-side or network error occurred. Handle it accordingly.
		  console.error('An error occurred:', error.error.message);
		}
	GetUserByEmail(email) {

		return this.http.get(this.AccountsURL + email)
		  
	}
	GetUser(id) {
		return this.http.get(this.UserURL + id)
			.map(res => res.json());
	}
	GetPagesByUserID(id) {
		return this.http.get(this.dataURL + id)
			.map(res => res.json());
	}

	DeletePage(UserID, PageID) {
		return this.http.delete(this.dataURL + UserID)
			.map(res => res.json());
	}

	PumpData(ApiEndPoint) {
		return this.http.get(ApiEndPoint)
			.map(res => res.json());

	}
	GetMySharedPages(id) {

		return this.http.get(this.SharedDashboardsURL + id)

	}
	DeleteSharedPages(id) {
		return this.http.delete(this.SharedDashboardsURL + id)
	}
	
	SharePageByUserID (email, sharedObj) :any{
		var obj: any;
		var idtemp: number;
	
		this.GetUserByEmail(email).subscribe(
			
			(UserID) => {
			
			idtemp = +UserID.text();
			
			this.GetUser(idtemp).subscribe((user: any) => {
				console.log('shared obj:', sharedObj, user);
				let jsonOBJ = JSON.parse(user.shared);
				jsonOBJ.push(sharedObj);
				console.log('json obj', jsonOBJ);
				obj = {
					"id": user.id,
					"name": user.name,
					"email": user.email,
					"password": user.password,
					"data": user.data,
					"shared": JSON.stringify(jsonOBJ)
				};
				this.update(obj, idtemp).subscribe();
				console.log('obj to send', obj);
				
			}
		
		);
		}


	
	)


	}
}

export interface IUser {
	id: number;
	name: string,
	email: string,
	password: string,
	data: string
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
	items?: (ItemsEntity)[] | null;
}
export interface ItemsEntity {
	cols: number;
	rows: number;
	name: string;
	id: number;
	x: number;
	y: number;
}

