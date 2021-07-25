import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Constants } from 'src/app/config/Constants.config';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MapService } from 'src/app/core/services/map/map.service';
import { ShipmentModel } from 'src/app/core/model/shipment.model';
import { ShipmentList } from 'src/app/core/model/shipment-list.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  shipmentListUpdate!: any;
  shipment?: ShipmentModel;

  constructor() { }

  ngOnInit(): void {
  }

  onShipmentClickEvent(event: ShipmentModel | any){
    // this.shipment = undefined;
    if(event instanceof ShipmentModel) {
      this.shipment = event;
    }

  }

  
  onShipmentsByStatusEvent(event: ShipmentList | any){
    let update = event?.payload;
    if( update != undefined ) {
      this.shipmentListUpdate = update;
    }
  }

}

  