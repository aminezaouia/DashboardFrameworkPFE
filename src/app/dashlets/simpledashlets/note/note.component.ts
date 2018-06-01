import { Component, OnInit } from '@angular/core';
import { DashletBaseComponent } from '../../dashletbase/WidgetBase/dashletbase';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],

})

export class NoteComponent extends DashletBaseComponent implements OnInit {
  newnote: string = 'new note';

  SaveNote(newnote) {
    this.newnote = newnote;
    console.log(this.MyItem.OldData);
    this.SaveContentState(newnote);
  }

  ngOnInit() {

  }

}
