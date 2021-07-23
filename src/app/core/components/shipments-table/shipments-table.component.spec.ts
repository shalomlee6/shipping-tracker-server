import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsTableComponent } from './shipments-table.component';

describe('ShipmentsTableComponent', () => {
  let component: ShipmentsTableComponent;
  let fixture: ComponentFixture<ShipmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
