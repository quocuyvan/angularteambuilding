import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCryptogramComponent } from './receive-cryptogram.component';

describe('ReceiveCryptogramComponent', () => {
  let component: ReceiveCryptogramComponent;
  let fixture: ComponentFixture<ReceiveCryptogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveCryptogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveCryptogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
