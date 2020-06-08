import { TestBed } from '@angular/core/testing';

import { VuforiaService } from './vuforia.service';

describe('VuforiaService', () => {
  let service: VuforiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuforiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
