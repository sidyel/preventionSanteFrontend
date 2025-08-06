import { TestBed } from '@angular/core/testing';

import { HptUserService } from './hpt-user.service';

describe('HptUserService', () => {
  let service: HptUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HptUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
