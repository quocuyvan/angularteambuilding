import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingEventComponent } from './participating-event.component';

describe('ParticipatingEventComponent', () => {
  let component: ParticipatingEventComponent;
  let fixture: ComponentFixture<ParticipatingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
