import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingEventDetailComponent } from './participating-event-detail.component';

describe('ParticipatingEventDetailComponent', () => {
  let component: ParticipatingEventDetailComponent;
  let fixture: ComponentFixture<ParticipatingEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatingEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatingEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
