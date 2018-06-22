import { Routes, RouterModule } from '@angular/router';
import { TestdashComponent } from "./testdash/testdash.component";
import { PendingChangesGuard } from "./testdash/guard";

export const routes: Routes = [

  {
    path: 'testdash',
    loadChildren: './testdash/testdash.module#TestDashModule'
  }, {
    path: 'page/:id', component: TestdashComponent, data: [{ Sharing: false }]
    //, canDeactivate: [PendingChangesGuard]
  }
  ,
  {
    path: 'sharedpage', component: TestdashComponent, data: [{ Sharing: true }],
  },

];

export const routing = RouterModule.forChild(routes);
