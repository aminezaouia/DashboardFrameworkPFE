import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { TestdashComponent } from "./testdash/testdash.component";
import * as AllDashboards from "../dashboards/dashboardList";

export const routes: Routes = [
  // {
  //   path: '', redirectTo: 'testdash', pathMatch: 'full'
  // },
  {
    path: 'testdash',
    loadChildren: './testdash/testdash.module#TestDashModule'
  }, { path: 'page/:id', component: TestdashComponent,data: [{Sharing: false}] }
  ,
  {
    path: 'sharedpage', component: TestdashComponent,data: [{Sharing: true}],
  }


];

export const routing = RouterModule.forChild(routes);
