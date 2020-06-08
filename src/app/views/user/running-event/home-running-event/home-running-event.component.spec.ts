import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRunningEventComponent } from './home-running-event.component';

describe('HomeRunningEventComponent', () => {
  let component: HomeRunningEventComponent;
  let fixture: ComponentFixture<HomeRunningEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRunningEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRunningEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
