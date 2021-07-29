import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/config/Constants.config';
import { ShipmentList } from '../../model/shipment-list.model';
import { ShipmentModel } from '../../model/shipment.model';
import { ApiService } from '../../services/api/api.service';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-shipment-map',
  templateUrl: './shipment-map.component.html',
  styleUrls: ['./shipment-map.component.css']
})
export class ShipmentMapComponent implements OnInit {

  trailPath!: google.maps.Polyline
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  endPoint!: google.maps.LatLng;
  planePath!: google.maps.Polyline;
  shipmentList!: ShipmentList;
  startPoint!: google.maps.LatLng;
  planeSymbol!: { path: string; fillColor: string; fillOpacity: number; scale: number; anchor: google.maps.Point; strokeWeight: number; };
  animIndex = 0;
  shipmentId!: string;
  animLoop!: number;
  isAnimLoopRuning = false;
  loader!: Promise<any>;
  markers!: google.maps.Marker[];
  infoWindow?: google.maps.InfoWindow;
  mapUpdatesSubscription!: Subscription;
  @Input() shipment?: ShipmentModel;

  constructor(private mapService: MapService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.markers = [];
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

        // Subscribe to events
        this.mapUpdatesSubscription = this.mapService.onStatus().subscribe(
          (mapStatusUpdate: string) => {
            this.cleareMap(mapStatusUpdate)
          }
        )
      }
    )
  }

  ngOnChanges(simpleChange: SimpleChange) {
    if(this.shipment) {
      this.shipmentId = this.shipment.getShipmentsData().getShipment_id();
      let shipmentStatus = this.shipment.getShipmentsData().getShipment_status()
      switch(shipmentStatus) {
        case Constants.BOOKED_STATUS_ID: {
          let warehouseLat = this.shipment.getShipmentsData().getShipment_warehouse_latitude();
          let warehouseLon = this.shipment.getShipmentsData().getShipment_warehouse_longitude();

          this.dropMarker(warehouseLat,warehouseLon)
          
          break;
        }
        case Constants.TRANSIT_STATUS_ID: {
          let startpoint = [
            this.shipment.getShipmentsData().getShipment_warehouse_latitude(),
            this.shipment.getShipmentsData().getShipment_warehouse_longitude()
          ];
          let endPoint = [
            this.shipment.getShipmentsData().getShipment_latitude(),
            this.shipment.getShipmentsData().getShipment_longitude()
          ];
          this.animateFlight(startpoint, endPoint);
          break;
        }
        case Constants.DELIVERED_STATUS_ID: {

          let shipmentLat = this.shipment.getShipmentsData().getShipment_latitude();
          let shipmentLon = this.shipment.getShipmentsData().getShipment_longitude();

          this.dropMarker(shipmentLat, shipmentLon)
          break;
        }
      }
    }
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
  
    if(this.animIndex >= 100) {
      // end animation
      window.cancelAnimationFrame(this.animLoop);
      this.animIndex = 0;
      this.trailPath.setVisible(false);
      this.planePath.setVisible(false);

      // drop Marker
      this.onFinishFlightAnimation(nextPoint.lat(),nextPoint.lng())
     
    }else{
      this.animLoop = window.requestAnimationFrame(() =>{
        this.tick(startPoint, endPoint);
      });
    }
  }
  
  onFinishFlightAnimation(lat: number, lan: number) {

    this.apiService.updateShipmentById( this.shipmentId ).toPromise().then(
      (res:any) => {
        let shipmentId = res?.shipmentId ? res?.shipmentId : "---"; 
        let msg = res?.msg ? res?.msg : "---"
        console.log(msg)
        this.shipment?.getShipmentsData().setShipment_status(Constants.DELIVERED_STATUS_ID);
        this.dropDeliveredMarker(lat,lan );
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  dropMarker(lat: number, lan: number) {

    let dropPoint =	new google.maps.LatLng(lat, lan);

    let marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: { lat: dropPoint.lat(), lng: dropPoint.lng() },
    });

    // const markerLayout = "<p>Marker Location:" + marker.getPosition() + "</p>";
    const markerLayout = this.generateMarkerLayout()


    const infowindow = new google.maps.InfoWindow({
      content: markerLayout,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: false,
      });
    });

    this.markers.push(marker);
  }

  dropDeliveredMarker(lat: number, lan: number) {

    let dropPoint =	new google.maps.LatLng(lat, lan);

    let marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: { lat: dropPoint.lat(), lng: dropPoint.lng() },
    });

    const markerLayout = this.generateDeliveredMarkerLayout()

    const infowindow = new google.maps.InfoWindow({
      content: markerLayout,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: false,
      });
    });

    this.markers.push(marker);
  }

  // TODO => use EJS from Node
  generateDeliveredMarkerLayout() {
    let city = this.shipment?.getShipmentDetails().getDestenation_city();
    let country = this.shipment?.getShipmentDetails().getDestenation_country()
    let street = this.shipment?.getShipmentDetails().getDestenation_street_address();
    let mail = this.shipment?.getShipmentDetails().getEmail();
    let first = this.shipment?.getShipmentDetails().getFirst_name();
    let last = this.shipment?.getShipmentDetails().getLast_name();
    let status = this.shipment?.getShipmentsData().getShipment_status();
    return '<div id="content" style="max-width: 400px;">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h5 id="firstHeading" class="firstHeading" style="margin: 0;color: lightgreen;font-size: 20px;">' + `Delivered` + '</h5>' +
    '<div id="bodyContent" style="display: grid; grid-template-columns: 1fr 1fr ">' +
    '<div class="left" style="display: flex;flex-direction: column;text-align: left;">' + 
    "<span>" + "<b>First Name: </b>" + `${first}` + "</span>" +
    "<span>" + "<b>Last Name: </b>" + `${last}` + "</span>" +
    "<span>" + "<b>Email: </b>" + `${mail}` + "</span>" +
    "<span>" + "<b>Shipment Status: </b>" + `${status}` + "</span>" +
    '</div>' +
    '<div class="right" style="display: flex;flex-direction: column;text-align: left;"> '+ 
    "<span>" + "<b>Destenation City:</b>" + `${city}` + "</span>" +
    "<span>" + "<b>Destenation Country:</b>" + `${country}` + "</span>" +
    "<span>" + "<b>Destenation Street Address:</b>" + `${street}` + "</span>" +
    '</div>' +
    "</div>" +
    "</div>";
  }
  
  // TODO => use EJS from Node
  generateMarkerLayout() {
    let header = this.shipment?.getShipmentsData().getShipment_warehouse();
    let city = this.shipment?.getShipmentDetails().getDestenation_city();
    let country = this.shipment?.getShipmentDetails().getDestenation_country()
    let street = this.shipment?.getShipmentDetails().getDestenation_street_address();
    let mail = this.shipment?.getShipmentDetails().getEmail();
    let first = this.shipment?.getShipmentDetails().getFirst_name();
    let last = this.shipment?.getShipmentDetails().getLast_name();
    let status = this.shipment?.getShipmentsData().getShipment_status();
    return '<div id="content" style="max-width: 400px;">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h5 id="firstHeading" class="firstHeading" style="margin: 0;color: lightgreen;font-size: 20px;">' + `${header}` + '</h5>' +
    '<div id="bodyContent" style="display: grid; grid-template-columns: 1fr 1fr ">' +
    '<div class="left" style="display: flex;flex-direction: column;text-align: left;">' + 
    "<span>" + "<b>First Name: </b>" + `${first}` + "</span>" +
    "<span>" + "<b>Last Name: </b>" + `${last}` + "</span>" +
    "<span>" + "<b>Email: </b>" + `${mail}` + "</span>" +
    "<span>" + "<b>Shipment Status: </b>" + `${status}` + "</span>" +

    
    '</div>' +
    '<div class="right" style="display: flex;flex-direction: column;text-align: left;"> '+ 
    "<span>" + "<b>Destenation City: </b>" + `${city}` + "</span>" +
    "<span>" + "<b>Destenation Country: </b>" + `${country}` + "</span>" +
    "<span>" + "<b>Destenation Street Address: </b>" + `${street}` + "</span>" +
    '</div>' +
    "</div>" +
    "</div>";
  }

  handleDrop(marker: google.maps.Marker) {


    let contentString = '<p>WHY ME FIRST?</p>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      position: marker.getPosition(),
    });

    infowindow.open( this.map,  marker );
  }

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

  cleareMap(mapStatusUpdate: string){
    this.deleteMarkers();
  }

  deleteMarkers(): void {
    // hideMarkers();
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
}
