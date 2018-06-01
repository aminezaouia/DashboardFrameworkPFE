import { ObservableStore } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";

interface IState
{

    RestorPageState(PageID):Observable<any>;
    RestoreWidgetState(widget);
    
}