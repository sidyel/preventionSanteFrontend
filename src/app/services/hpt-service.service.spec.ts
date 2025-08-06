import { TestBed } from '@angular/core/testing';

import { HptServiceService } from './hpt-service.service';

describe('HptServiceService', () => {
  let service: HptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
