import {NgModule} from '@angular/core';
import {SmartadminModule} from '../../shared/smartadmin.module'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FlotChartModule} from "../../shared/graphs/flot-chart/flot-chart.module";
import {D3Module} from "../../shared/graphs/d3/d3.module";
import { Browser } from 'protractor';
import { TestdashComponent } from './testdash.component';
import { DashboardGridsterConfigService } from './dashboard-gridster-config.service';
import {TestdashRouting} from "./testdash.routing";
import { GridsterConfig, GridsterItem ,GridsterModule} from 'angular-gridster2';
import { ModalModule } from 'ngx-bootstrap';
//import { BirdEyeComponent } from '../../dashlets/simpledashlets/bird-eye/bird-eye.component';
import { ChartsModule } from 'ng2-charts';
import { DynamicModule } from 'ng-dynamic-component';
import {PdfViewerComponent} from "../../dashlets/simpledashlets/pdfviewer/pdfviewer.component";
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import {AlertService} from "../../alert/alert.service";
import {AlertComponent} from "../../alert/alert.component";
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import {DeclarationComponent} from "../../dashlets/simpledashlets/index";
import {EntryComponent} from "../../dashlets/simpledashlets/index";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

DeclarationComponent.push(AlertComponent,TestdashComponent,PdfViewerComponent)
@NgModule({
  
  imports: [
    SmartadminModule,PDFExportModule,
    TestdashRouting,
    FlotChartModule,MatButtonModule, MatCheckboxModule,
    D3Module,TestdashRouting,PdfViewerModule
    ,GridsterModule,ModalModule,ChartsModule,DynamicModule.withComponents([PdfViewerComponent]), Ng4LoadingSpinnerModule.forRoot() 
  ],
  declarations: DeclarationComponent,
  providers: [DashboardGridsterConfigService],
  bootstrap: EntryComponent
})
export class TestDashModule {

}
