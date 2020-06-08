import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDetailComponent } from './create-event-detail.component';

describe('CreateEventDetailComponent', () => {
  let component: CreateEventDetailComponent;
  let fixture: ComponentFixture<CreateEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
