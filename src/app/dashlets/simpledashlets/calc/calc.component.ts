import { Component, OnInit } from '@angular/core';
import { DashletBaseComponent } from '../../dashletbase/WidgetBase/dashletbase';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent extends DashletBaseComponent implements OnInit {
  Result: number = +this.StoredData;
  constructor() { super(); }
  calc(A: number, B: number) {
    A = +A;
    B = +B;
    var x: number = A + B;
    this.Result = x;
    console.log(x);
    this.SaveContentState(this.Result);
  }
  ngOnInit() {
    this.LoadContentState();
    this.Result=this.StoredData;
  }

}
