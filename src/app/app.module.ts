import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { Http ,HttpModule } from '@angular/http';
import { DynamicModule } from 'ng-dynamic-component';
import { FusionChartsModule } from 'angular4-fusioncharts';
import {DataService} from "../app/dashlets/dashletbase/dataservice.service";


import { FormsModule } from '@angular/forms';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";
import {AlertService} from "../app/alert/alert.service";
import { GridsterModule } from 'angular-gridster2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/alert/alert.module';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatTooltipModule,MatIcon,MatIconBase
} from '@angular/material';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { DashboardGridsterConfigService } from './dashboards/testdash/dashboard-gridster-config.service';
//import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SelfalertComponent } from './selfalert/selfalert.component';
import { routes } from './dashboards/dashboard.routing';
import { CalcComponent } from './dashlets/simpledashlets/calc/calc.component';
import { SignpageComponent } from './signpage/signpage.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { TodoService } from './dashlets/simpledashlets/todo-widget/todo.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  }
]);

import { EmbedVideo } from 'ngx-embed-video';
//import { Widget1Component } from './dashlets/simpledashlets/widget1/widget1.component';
//import { ListwidgetsComponent } from "../../src/app/dashboards/listwidgets/listwidgets.component";
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];
export function provideConfig() {
  return config;
}
type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HeaderComponent,LoginComponent,
    HomeComponent,SignpageComponent,
    SelfalertComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,HttpClientModule,
    BrowserAnimationsModule,HttpModule,AlertModule,  BootstrapSwitchModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,SocialLoginModule,
    GridsterModule, MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
     MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatListModule,
    GridsterModule,ModalModule, Ng4LoadingSpinnerModule.forRoot() ,
    ModalModule.forRoot(),ChartsModule, EmbedVideo.forRoot()


    ,CoreModule,
    SmartadminLayoutModule,

    routing
  ],
  exports: [

  
  ],
  providers: [DashboardGridsterConfigService ,TodoService,// expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,DataService, AuthService,AlertService,SelfalertComponent,   {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}


}

