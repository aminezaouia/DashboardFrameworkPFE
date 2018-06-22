import { ObservableStore } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { DataService } from "../dataservice.service";
import { ViewChild, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TestdashComponent } from "../../../dashboards/testdash/testdash.component";
import { IDashletBase } from "./IDashletBase";
export class DashletBaseComponent implements OnInit, IDashletBase {

    constructor() { }
    @Output() UpdateItem = new EventEmitter<string>();
    public _dataService: DataService;

    @Input() index: number;
    @Input() MyItem: any;
    @Input() items: any;
    @Output() itemsChange = new EventEmitter<any>();
    StoredData: any;
    SaveContentState(data: any) {
        this.items[this.index].OldData = data;
        this.itemsChange.emit(this.items);
    }

    LoadContentState() { }

    ngOnInit() {
        this.StoredData = this.MyItem.OldData
    }



}

