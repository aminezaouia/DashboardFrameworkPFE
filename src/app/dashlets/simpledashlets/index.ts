//******************Add your new widget here******************//
import { NoteComponent } from './note/note.component'
import { PieComponent } from "./pie/pie.component";
import { BirdEyeComponent } from './bird-eye/bird-eye.component'
import { LinechartComponent } from "./linechart/linechart.component";
import { LiveFeedsComponent } from './live-feeds/live-feeds.component'
import { LiveStatsComponent } from './live-feeds/live-stats.component'
import { RevenueComponent } from './live-feeds/revenue.component'
import { SocialNetworkComponent } from './live-feeds/social-network.component'
import { PdfViewerComponent } from "./pdfviewer/pdfviewer.component";
import { barchart } from './widget1/widget1.component'
import { CalcComponent } from './calc/calc.component';
//Add the new component and all the components used in it in  EntryComponent 
export const EntryComponent: Array<any> = [NoteComponent, PieComponent, BirdEyeComponent,
    LinechartComponent, LiveFeedsComponent, RevenueComponent, SocialNetworkComponent,
    LiveStatsComponent,barchart,CalcComponent];
export const DeclarationComponent=EntryComponent;
//Add the icon and the name of the widget in Library
export const Library: Array<any> = [
    { 'component':CalcComponent , 'name': 'calculator ', 'icon': 'fa fa-calculator' },
    { 'component': NoteComponent, 'name': 'Note', 'icon': 'fa fa-edit' },
    { 'component': PieComponent, 'name': 'Pie chart', 'icon': 'fa fa-pie-chart' },
    { 'component': BirdEyeComponent, 'name': 'Bird eye', 'icon': 'glyphicon glyphicon-map-marker' },
    { 'component': LinechartComponent, 'name': 'Line chart', 'icon': 'fa fa-line-chart' },
    { 'component': LiveFeedsComponent, 'name': 'Live feeds', 'icon': 'fa fa-qrcode' },
    { 'component': barchart, 'name': 'Bar chart', 'icon': 'fa fa-bar-chart' }
]
//After adding all your widgets you can add a demo as a video for the user by adding your
//Youtube Id and a video will load  when the user needs it since it will be added to 
//the Home page 

export const YoutubeID:string='FUgM105uN4c';
export const Logo:string='assets/img/logo.png';
