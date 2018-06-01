export interface IDashletBase{
    SaveContentState(data: any):void;
    LoadContentState():void;
    StoredData: any;

}