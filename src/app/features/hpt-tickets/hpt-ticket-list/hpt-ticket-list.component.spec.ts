import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptTicketListComponent } from './hpt-ticket-list.component';

describe('HptTicketListComponent', () => {
  let component: HptTicketListComponent;
  let fixture: ComponentFixture<HptTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptTicketListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
