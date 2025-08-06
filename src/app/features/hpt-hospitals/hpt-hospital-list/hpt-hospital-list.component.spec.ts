import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptHospitalListComponent } from './hpt-hospital-list.component';

describe('HptHospitalListComponent', () => {
  let component: HptHospitalListComponent;
  let fixture: ComponentFixture<HptHospitalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptHospitalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptHospitalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
