import { TestBed } from '@angular/core/testing';

import { HptHospitalService } from './hpt-hospital.service';

describe('HptHospitalService', () => {
  let service: HptHospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HptHospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
