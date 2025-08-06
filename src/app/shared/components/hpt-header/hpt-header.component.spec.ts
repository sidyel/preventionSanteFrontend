import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptHeaderComponent } from './hpt-header.component';

describe('HptHeaderComponent', () => {
  let component: HptHeaderComponent;
  let fixture: ComponentFixture<HptHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
