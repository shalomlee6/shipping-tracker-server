import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStatusCtrComponent } from './shipment-status-ctr.component';

describe('ShipmentStatusCtrComponent', () => {
  let component: ShipmentStatusCtrComponent;
  let fixture: ComponentFixture<ShipmentStatusCtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentStatusCtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentStatusCtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
