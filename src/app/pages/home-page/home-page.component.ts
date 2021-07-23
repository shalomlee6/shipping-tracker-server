import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Constants } from 'src/app/config/Constants.config';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MapService } from 'src/app/core/services/map/map.service';
import { ShipmentModel } from 'src/app/core/model/shipment.model';

import { AnimationUtils } from 'src/app/Utils/animation.utils';
import { ShipmentList } from 'src/app/core/model/shipment-list.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  trailPath!: google.maps.Polyline
  map!: google.maps.Map;
  shipments!: ShipmentList;
  shipment!: ShipmentModel;
  marker!: google.maps.Marker;
  planeSymbol!: { path: string; fillColor: string; fillOpacity: number; scale: number; anchor: google.maps.Point; strokeWeight: number; };
  planePath!: google.maps.Polyline;
  animIndex = 0;
  startPoint!: google.maps.LatLng;
  endPoint!: google.maps.LatLng;
  animLoop!: number;
  isAnimLoopRuning = false;
  loader!: Promise<any>;

  constructor(private mapService: MapService, private apiService: ApiService) { }

  ngOnInit(): void {
    // this.shipments = shipmentsData;
    // this.shipments =  new Map<string,ShipmentModel>();
    this.loader = this.mapService.getGoogleMaps();
    this.loader.then(
      () => {
        this.initializeComponent();
        this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: Constants.CAMERA_LATITUDE, lng: Constants.CAMERA_LONGITUDE },
          zoom: Constants.CAMERA_ZOOM,
          draggable: false,
          panControl: false,
          streetViewControl: false,
          scrollwheel: false,
          scaleControl: false,
          disableDefaultUI: false,
          disableDoubleClickZoom: true,
          styles: [ { featureType: "administrative", elementType: "geometry",stylers: [{visibility: "off" }]}]
        });
      }
    )
  }

  getShipments(){
    this.apiService.getShipmentsTableData().subscribe(
      (res:any) => {
        let headers: Array<string> = Object.keys(res?.shipmentData[0]);
        for(let i = 0; i < headers.length; i++) {
          headers[i] = headers[i].replace(/_/, " ")
          headers[i] = headers[i].replace(/shipment /, "")
        }
        // this.shipments = new Map<string,ShipmentModel>().set( Constants.SHIPMENT_MODEL_ID ,new ShipmentModel(res?.shipmentData) )
        this.shipments = new ShipmentList(res);

      }
    )
    // .toPromise()
    // .then(
    //   (res:any) => {
    //     let item = res?.shipmentData;
    //     this.shipment =  new ShipmentModel(item);

    //   }
    // )
    // .catch(

    // )
  }

  getShipmentsHeaders() {

  }

  initializeComponent() {

    this.planeSymbol	= {
      path: 'M22.1,15.1c0,0-1.4-1.3-3-3l0-1.9c0-0.2-0.2-0.4-0.4-0.4l-0.5,0c-0.2,0-0.4,0.2-0.4,0.4l0,0.7c-0.5-0.5-1.1-1.1-1.6-1.6l0-1.5c0-0.2-0.2-0.4-0.4-0.4l-0.4,0c-0.2,0-0.4,0.2-0.4,0.4l0,0.3c-1-0.9-1.8-1.7-2-1.9c-0.3-0.2-0.5-0.3-0.6-0.4l-0.3-3.8c0-0.2-0.3-0.9-1.1-0.9c-0.8,0-1.1,0.8-1.1,0.9L9.7,6.1C9.5,6.2,9.4,6.3,9.2,6.4c-0.3,0.2-1,0.9-2,1.9l0-0.3c0-0.2-0.2-0.4-0.4-0.4l-0.4,0C6.2,7.5,6,7.7,6,7.9l0,1.5c-0.5,0.5-1.1,1-1.6,1.6l0-0.7c0-0.2-0.2-0.4-0.4-0.4l-0.5,0c-0.2,0-0.4,0.2-0.4,0.4l0,1.9c-1.7,1.6-3,3-3,3c0,0.1,0,1.2,0,1.2s0.2,0.4,0.5,0.4s4.6-4.4,7.8-4.7c0.7,0,1.1-0.1,1.4,0l0.3,5.8l-2.5,2.2c0,0-0.2,1.1,0,1.1c0.2,0.1,0.6,0,0.7-0.2c0.1-0.2,0.6-0.2,1.4-0.4c0.2,0,0.4-0.1,0.5-0.2c0.1,0.2,0.2,0.4,0.7,0.4c0.5,0,0.6-0.2,0.7-0.4c0.1,0.1,0.3,0.1,0.5,0.2c0.8,0.2,1.3,0.2,1.4,0.4c0.1,0.2,0.6,0.3,0.7,0.2c0.2-0.1,0-1.1,0-1.1l-2.5-2.2l0.3-5.7c0.3-0.3,0.7-0.1,1.6-0.1c3.3,0.3,7.6,4.7,7.8,4.7c0.3,0,0.5-0.4,0.5-0.4S22,15.3,22.1,15.1z',
      fillColor: '#000',
      fillOpacity: 1.5,
      scale: 0.8,
      anchor: new google.maps.Point(11, 11),
      strokeWeight: 0
    };
  }


  addFlight() {
    let start  = [Constants.ISRAEL_BREANCH_LATITUDE, Constants.ISRAEL_BREANCH_LONGITUDE]
    let end  = [37.7786, -122.4892]
    this.animateFlight(start,end)
  }

  animateFlight(startPoint: Array<number>, endPoint: Array<number>) {
  
    // Convert the points arrays into Lat / Lng objects
    this.startPoint			=	new google.maps.LatLng(startPoint[0],startPoint[1]);
    this.endPoint = 	new google.maps.LatLng(endPoint[0],endPoint[1]);
  
    // Create a polyline for the planes path
    this.planePath = new google.maps.Polyline({
      path: [this.startPoint, this.endPoint],
      strokeColor: '#0f0',
      strokeWeight: 0,
      icons: [{
        icon: this.planeSymbol,
        offset: '0%'
      }],
      map: this.map,
      geodesic: true
    });
  
    this.trailPath = new google.maps.Polyline({
      path: [this.startPoint, this.endPoint],
      strokeColor: '#2eacd0',
      strokeWeight: 2,
      map: this.map,
      geodesic: true
    });

    this.animLoop = window.requestAnimationFrame( () => {
      this.tick(this.startPoint, this.endPoint);
    });
  }

  tick(startPoint: google.maps.LatLng, endPoint: google.maps.LatLng) {

    // Animation Index
    this.animIndex+=0.2;

    // Draw trail
    var nextPoint	=	google.maps.geometry.spherical.interpolate(startPoint,endPoint,this.animIndex/100);
    this.trailPath.setPath([startPoint, nextPoint]);
    
    // Move the plane
    this.planePath.setOptions({
      icons: [{
        icon: this.planeSymbol,
        offset: Math.min(this.animIndex,100)+'%'
      }] 
    })
    this.planePath.setPath(this.planePath.getPath());
 
    // Ensure the plane is in the center of the screen
    // this.map.panTo(nextPoint);
  
    if(this.animIndex >= 100) {
      window.cancelAnimationFrame(this.animLoop);
      this.animIndex = 0;
      this.trailPath.setVisible(false);
      this.planePath.setVisible(false);

      this.marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: nextPoint.lat(), lng: nextPoint.lng() },
      });
      this.marker.addListener("click", this.toggleBounce );

    }else{
      this.animLoop = window.requestAnimationFrame(() =>{
        this.tick(startPoint, endPoint);
      });
    }
  }

  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  // at fixed intervals.
  // Use the DOM setInterval() function to change the offset of the shipment
  animateShipment(start: Array<any>, end: Array<any>) {

    // Define the symbol, using one of the predefined paths ('CIRCLE')
    const lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: "#393",
    };

    // Create the polyline and add the symbol to it via the 'icons' property. { lat: 37.7786, lng: -122.4892 },
    const line = new google.maps.Polyline({
      path: [
        { lat: start[0], lng: start[1] },
        { lat: end[0], lng: end[1] },
      ],
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
        },
      ],
      map: this.map,
    });

    let count = 0;
    window.setInterval(() => {
      count = (count + 1) % 200;
      const icons = line.get("icons");
      icons[0].offset = count / 2 + "%";
      line.set("icons", icons);
    }, 200);
  }

}


  // autoRefresh() {
  //   let i, route: google.maps.Polyline, marker: google.maps.Marker;

  //   route = new google.maps.Polyline({
  //       path: [],
  //       geodesic : true,
  //       strokeColor: '#FF0000',
  //       strokeOpacity: 1.0,
  //       strokeWeight: 2,
  //       editable: false,
  //       map:this.map
  //   });

  //   var animLoop = false,
  //   animIndex = 0,
  //   planePath = false,
  //   trailPath = false;

  //   // Reference of city lat / long points

  //   var places	=	{
  //     "london"	:	[51.5072,0.1275],
  //     "rome"		:	[41.9000,12.5000],
  //     "frankfurt"	:	[50.1167,8.6833],
  //     "athens"	:	[37.9667,23.7167],
  //     "cairo"		:	[30.0500,31.2333],
  //     "bangalore"	:	[7.883118, 80.793123]
  //   };

  //   // Plane Symbol - uses an SVG path
  //   var planeSymbol	= {
  //     path: 'M22.1,15.1c0,0-1.4-1.3-3-3l0-1.9c0-0.2-0.2-0.4-0.4-0.4l-0.5,0c-0.2,0-0.4,0.2-0.4,0.4l0,0.7c-0.5-0.5-1.1-1.1-1.6-1.6l0-1.5c0-0.2-0.2-0.4-0.4-0.4l-0.4,0c-0.2,0-0.4,0.2-0.4,0.4l0,0.3c-1-0.9-1.8-1.7-2-1.9c-0.3-0.2-0.5-0.3-0.6-0.4l-0.3-3.8c0-0.2-0.3-0.9-1.1-0.9c-0.8,0-1.1,0.8-1.1,0.9L9.7,6.1C9.5,6.2,9.4,6.3,9.2,6.4c-0.3,0.2-1,0.9-2,1.9l0-0.3c0-0.2-0.2-0.4-0.4-0.4l-0.4,0C6.2,7.5,6,7.7,6,7.9l0,1.5c-0.5,0.5-1.1,1-1.6,1.6l0-0.7c0-0.2-0.2-0.4-0.4-0.4l-0.5,0c-0.2,0-0.4,0.2-0.4,0.4l0,1.9c-1.7,1.6-3,3-3,3c0,0.1,0,1.2,0,1.2s0.2,0.4,0.5,0.4s4.6-4.4,7.8-4.7c0.7,0,1.1-0.1,1.4,0l0.3,5.8l-2.5,2.2c0,0-0.2,1.1,0,1.1c0.2,0.1,0.6,0,0.7-0.2c0.1-0.2,0.6-0.2,1.4-0.4c0.2,0,0.4-0.1,0.5-0.2c0.1,0.2,0.2,0.4,0.7,0.4c0.5,0,0.6-0.2,0.7-0.4c0.1,0.1,0.3,0.1,0.5,0.2c0.8,0.2,1.3,0.2,1.4,0.4c0.1,0.2,0.6,0.3,0.7,0.2c0.2-0.1,0-1.1,0-1.1l-2.5-2.2l0.3-5.7c0.3-0.3,0.7-0.1,1.6-0.1c3.3,0.3,7.6,4.7,7.8,4.7c0.3,0,0.5-0.4,0.5-0.4S22,15.3,22.1,15.1z',
  //     fillColor: '#000',
  //     fillOpacity: 1.5,
  //     scale: 0.8,
  //     anchor: new google.maps.Point(11, 11),
  //     strokeWeight: 0
  //   };
  // }
   

  