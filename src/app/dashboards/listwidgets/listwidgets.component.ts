import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { barchart } from '../../dashlets/simpledashlets/widget1/widget1.component';

@Component({
  selector: 'app-listwidgets',
  templateUrl: './listwidgets.component.html',
  styleUrls: ['./listwidgets.component.css']
})
export class ListwidgetsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

   Listwidgets: widget[];

}
export const allwidgets=this.Listwidgets;
  class widget {
    widgetcomponent: any;
    id: string;
constructor(c:any,i:string){
  this.widgetcomponent=c;
  this.id=i;
}
 
}
 

