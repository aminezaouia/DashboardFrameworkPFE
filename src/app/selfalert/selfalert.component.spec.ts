import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfalertComponent } from './selfalert.component';

describe('SelfalertComponent', () => {
  let component: SelfalertComponent;
  let fixture: ComponentFixture<SelfalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
