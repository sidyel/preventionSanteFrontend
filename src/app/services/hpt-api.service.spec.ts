import { TestBed } from '@angular/core/testing';

import { HptApiService } from './hpt-api.service';

describe('HptApiService', () => {
  let service: HptApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HptApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
