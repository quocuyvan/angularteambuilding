import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLogComponent } from './team-log.component';

describe('TeamLogComponent', () => {
  let component: TeamLogComponent;
  let fixture: ComponentFixture<TeamLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
