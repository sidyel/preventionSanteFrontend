import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptTicketCreateComponent } from './hpt-ticket-create.component';

describe('HptTicketCreateComponent', () => {
  let component: HptTicketCreateComponent;
  let fixture: ComponentFixture<HptTicketCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptTicketCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptTicketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
