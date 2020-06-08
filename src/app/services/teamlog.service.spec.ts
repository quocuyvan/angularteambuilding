import { TestBed } from '@angular/core/testing';

import { TeamlogService } from './teamlog.service';

describe('TeamlogService', () => {
  let service: TeamlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
