import { Component, OnInit, Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { AlertModule } from 'ng2-bootstrap/alert/alert.module/';
@Component({
  selector: 'app-selfalert',
  templateUrl: './selfalert.component.html',
  styleUrls: ['./selfalert.component.css']
})
@Injectable()
  export class SelfalertComponent implements OnInit {
    private _success = new Subject<string>();
  
    staticAlertClosed = false;
    successMessage: string;
  
    ngOnInit(): void {
      setTimeout(() => this.staticAlertClosed = true, 2000);
  
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
    }
  
    public changeSuccessMessage() {
      this._success.next(`${new Date()} - Message successfully changed.`);
    }
  }