import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationChallengeComponent } from './station-challenge.component';

describe('StationChallengeComponent', () => {
  let component: StationChallengeComponent;
  let fixture: ComponentFixture<StationChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
