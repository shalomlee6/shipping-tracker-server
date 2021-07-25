import { ShipmentModel } from "./shipment.model";

export class ShipmentList {

    private headers: Array<string>;
    private shipmentList: Map<string,ShipmentModel>;
    private shipmentsArr: any[];

    constructor(shipments: any) {
        this.headers = new Array<string>();
        this.shipmentsArr = new Array<string>();
        this.shipmentList = new Map<string,ShipmentModel>();
        this.generateShipmentsData(shipments);
        this.generateShipmentsDataTableHeders(shipments);
    }

    private generateShipmentsData(shipments:  any) {
        let booked: Array<any> = shipments?.booked ? shipments?.booked : [];
        let transit: Array<any> = shipments?.transit ? shipments?.transit : [];
        let delivered: Array<any> = shipments?.delivered ? shipments?.delivered : [];

        if(booked.length > 0 && transit.length > 0 && delivered.length > 0) {
            this.shipmentsArr = booked.concat(transit).concat(delivered)
            for(let i = 0; i <  this.shipmentsArr.length; i++) {
                this.shipmentList.set(  this.shipmentsArr[i]._id , new ShipmentModel( this.shipmentsArr[i]) ) 
            }
        } else {
            
            for(let i = 0; i <  shipments.length; i++) {
                this.shipmentList.set(  shipments[i]._id , new ShipmentModel( shipments[i]) ) 
            }
        }
    }

    private generateShipmentsDataTableHeders(res: any) {
        let header = res.booked ? res.booked : res.transit ? res.transit : res.delivered ? res.delivered : []
        if(header[0]) {
            let shipmentHeaders = Object.keys(header[0]);
            for(let i = 0; i < shipmentHeaders.length; i++) {

                if( shipmentHeaders[i].includes('shipment')){
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/_/, " ")
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/shipment /, "")
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/_/, " ")
                    this.headers.push(shipmentHeaders[i]);
                }
            }
        } else {
            let shipmentHeaders = Object.keys(res[0]);
            for(let i = 0; i < shipmentHeaders.length; i++) {

                if( shipmentHeaders[i].includes('shipment')){
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/_/, " ")
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/shipment /, "")
                    // shipmentHeaders[i] = shipmentHeaders[i].replace(/_/, " ")
                    this.headers.push(shipmentHeaders[i]);
                }
            }
        } 

        
    }

    getHeaders(): Array<string> {
        return this.headers!;
    }

    setHeaders(headers: Array<string>): void {
        this.headers = headers!;
    }

    getShipmentList(): Map<string,ShipmentModel> {
        return this.shipmentList;
    }

    setShipmentList(shipmentList: Map<string,ShipmentModel>): void {
        this.shipmentList = shipmentList;
    }
}