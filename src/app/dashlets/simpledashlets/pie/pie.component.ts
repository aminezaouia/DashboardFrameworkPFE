import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import 'chart.js'
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  chartOptions = {
    responsive: true
  };
  constructor() { }

  ngOnInit() {
  }
 // Doughnut
 public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 public doughnutChartData:number[] = [350, 450, 100];
 public doughnutChartType:string = 'doughnut';

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }
}