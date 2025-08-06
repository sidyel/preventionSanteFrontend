import { TestBed } from '@angular/core/testing';

import { HptTicketService } from './hpt-ticket.service';

describe('HptTicketService', () => {
  let service: HptTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HptTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
