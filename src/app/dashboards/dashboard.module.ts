import {NgModule} from '@angular/core';

import {SmartadminModule} from '../shared/smartadmin.module'

import {routing} from './dashboard.routing';
import { ListwidgetsComponent } from './listwidgets/listwidgets.component';

import {MatDialogModule} from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { TestDashModule } from './testdash/testdash.module';

@NgModule({
  imports: [
    SmartadminModule,
    routing,MatDialogModule,ChartsModule,TestDashModule
  ],
  declarations: [ ListwidgetsComponent],
  providers: [],
})
export class DashboardModule {

}
