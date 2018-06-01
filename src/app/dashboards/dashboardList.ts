import {ModuleWithProviders, Input} from "@angular/core"
import {BirdEyeComponent} from "../dashlets/simpledashlets/bird-eye/bird-eye.component";
import {LiveFeedsComponent} from "../dashlets/simpledashlets/live-feeds/live-feeds.component";
import {TodoWidgetComponent} from "../dashlets/simpledashlets/todo-widget/todo-widget.component";
import { BigBreadcrumbsComponent } from "../shared/layout";
import { barchart } from "../dashlets/simpledashlets/widget1/widget1.component";
import { TestdashComponent } from "./testdash/testdash.component";
import { widget } from "../dashlets/dashletbase/widget";
import { DataService } from "../dashlets/dashletbase/dataservice.service";


export class Dashboard
{
    name: string;
    id: number;
    constructor(c:number,i:string){
      this.id=c;
      this.name=i;
    }}
var List: Dashboard[] = [];

export let ListAll=List;

export class ListWidgetsByDashboardId{

    id: number;
    list:widget[];
    constructor(c:number){
      this.id=c;
   
    }}


