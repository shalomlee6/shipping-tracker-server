import { ShipmentModel } from "./shipment.model";

export class ShipmentList {

    private headers!: Array<string>;
    private shipmentList!: Map<number,ShipmentModel>;

    constructor(shipments: Array<any>) {
        this.headers = new Array<string>();
        this.shipmentList = new Map<number,ShipmentModel>();
        this.generateShipmentsData(shipments);
    }

    private generateShipmentsData(shipments: Array<any>) {
        shipments.forEach( (shipment:any) => {
            this.shipmentList.set( Number( shipment.shipment_id.$oid), new ShipmentModel(shipment) )
        });
    }

    generateShipmentsDataTableHeders(res: Array<any>) {
        this.headers = Object.keys(res);
        
    }
    getHeaders(): Array<string> {
        return this.headers!;
    }

    setHeaders(headers: Array<string>): void {
        this.headers = headers!;
    }

    getShipmentList(): Map<number,ShipmentModel> {
        return this.shipmentList;
    }

    setShipmentList(shipmentList: Map<number,ShipmentModel>): void {
        this.shipmentList = shipmentList;
    }
}