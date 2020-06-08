import { TestBed } from '@angular/core/testing';

import { PlacemarkolmapService } from './placemarkolmap.service';

describe('PlacemarkolmapService', () => {
  let service: PlacemarkolmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacemarkolmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
