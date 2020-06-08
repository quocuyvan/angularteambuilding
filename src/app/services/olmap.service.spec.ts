import { TestBed } from '@angular/core/testing';

import { OlmapService } from './olmap.service';

describe('OlmapService', () => {
  let service: OlmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
