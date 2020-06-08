import { TestBed } from '@angular/core/testing';

import { ManagementAccountService } from './management-account.service';

describe('ManagementAccountService', () => {
  let service: ManagementAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
