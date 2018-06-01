/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";
import { TestdashComponent } from './dashboards/testdash/testdash.component';
import { SignpageComponent } from './signpage/signpage.component';

export const routes: Routes = [
    {
        path: 'home',
        component: MainLayoutComponent,
        data: {pageTitle: 'Home'},
        children: [
          {
             path: '', redirectTo: 'home', pathMatch: 'full',
          },
           { path: 'home', loadChildren: 'app/+home/home.module#HomeModule',data:{pageTitle: 'Home'}},
           { path: 'dashboards', loadChildren: 'app/dashboards/dashboard.module#DashboardModule',data:{pageTitle: 'Dashboard'}},
        ]
    },
    { path: '', component: SignpageComponent},{path: 'login', component: SignpageComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
