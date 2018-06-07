import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import 'chart.js'
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
declare var $: any;
@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.css']
})
export class barchart implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  data: Array<string> = []
  ApiEndPoint: string = " http://localhost:3000/BarChartApi";
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public Ready: Promise<boolean>;
  getDataFromBackend() {
    let datax = [];
    let datay = [];
    $.getJSON('http://localhost:3000/data', function (jsondata) {
      console.log('all data', jsondata);
      console.log('precise', jsondata[0]._id);
      this.barChartLabels = [];
      for (let i = 0; i < jsondata.length; i++) {
        datax.push((jsondata[i]._id));
        datay.push((+jsondata[i].user_number));
        this.barChartLabels.push(jsondata[i]._id);
      }
      console.log('inside', this.barChartLabels)
      this.ready = Promise.resolve(true);;

    });
    setTimeout(() => {
      console.log('chart ', this.chart)
      this.chart.chart.data.labels = datax
      this.chart.chart.data.datasets[0].data = datay
      console.log('chart', this.chart)
      this.chart.chart.scales["y-axis-0"].options.ticks.beginAtZero = true;
      this.chart.chart.update();
    }, 1000)


  }


  public barChartLabels: Array<string>;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  isDataAvailable: boolean = false;
  ngOnInit() {
    this.getDataFromBackend();

  }



  public barChartData: any[] = [
    { data: [], label: 'number of user' }

  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}