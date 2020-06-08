import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEndingComponent } from './event-ending.component';

describe('EventEndingComponent', () => {
  let component: EventEndingComponent;
  let fixture: ComponentFixture<EventEndingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEndingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
