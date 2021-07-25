import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentMapComponent } from './shipment-map.component';

describe('ShipmentMapComponent', () => {
  let component: ShipmentMapComponent;
  let fixture: ComponentFixture<ShipmentMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
