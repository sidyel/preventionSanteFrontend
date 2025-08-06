import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptDashboardComponent } from './hpt-dashboard.component';

describe('HptDashboardComponent', () => {
  let component: HptDashboardComponent;
  let fixture: ComponentFixture<HptDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
