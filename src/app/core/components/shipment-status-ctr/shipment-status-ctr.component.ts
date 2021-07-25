import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/config/Constants.config';
import { ShipmentList } from '../../model/shipment-list.model';
import { ApiService } from '../../services/api/api.service';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-shipment-status-ctr',
  templateUrl: './shipment-status-ctr.component.html',
  styleUrls: ['./shipment-status-ctr.component.css']
})
export class ShipmentStatusCtrComponent implements OnInit {

  @Output() shipments = new EventEmitter();
  constructor(private apiService: ApiService, private mapService: MapService) { }

  ngOnInit(): void {
  }

  async getShipmentsByStatus( status: string, amount: number ) {
    this.mapService.onStatusUpdate(status);
    return await this.apiService.getShipmentStatusBySize( status,amount).toPromise()
    .then(
      res => {
        this.shipments.emit({
          payload: res ? res : []
        });
      }
    )
    .catch(
      err => {
        console.log("res => \n" + err);
      }
    )
  }
  
  getShipmentsByStatusBooked(){
    return this.getShipmentsByStatus(Constants.BOOKED_STATUS_ID, 10);
  }

  getShipmentsByStatusInTransit(){
    return this.getShipmentsByStatus(Constants.TRANSIT_STATUS_ID, 10);
  }

  getShipmentsByStatusDelivered(){
    return this.getShipmentsByStatus(Constants.DELIVERED_STATUS_ID, 10);
  }
}
