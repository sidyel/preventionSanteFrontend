import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptHospitalDetailComponent } from './hpt-hospital-detail.component';

describe('HptHospitalDetailComponent', () => {
  let component: HptHospitalDetailComponent;
  let fixture: ComponentFixture<HptHospitalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptHospitalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptHospitalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
