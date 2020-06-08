import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessStationComponent } from './access-station.component';

describe('AccessStationComponent', () => {
  let component: AccessStationComponent;
  let fixture: ComponentFixture<AccessStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
