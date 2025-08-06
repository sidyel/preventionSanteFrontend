import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HptLoadingComponent } from './hpt-loading.component';

describe('HptLoadingComponent', () => {
  let component: HptLoadingComponent;
  let fixture: ComponentFixture<HptLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HptLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HptLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
