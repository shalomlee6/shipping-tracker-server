import { ShipmentsData } from "./shipment-data.model";
import { ShipmentDetails } from "./shipment-details.model";

export class ShipmentModel{

    private shipmentsData!: ShipmentsData;
    private shipmentDetails!: ShipmentDetails;
    
    constructor(shipment: any) {
        this.generateShipment(shipment);
    }

    generateShipment(shipments: any) {

        this.shipmentsData = new ShipmentsData(
            shipments._id,
            shipments.shipment_status,
            shipments.shipment_place,
            shipments.shipment_latitude,
            shipments.shipment_longitude,
            shipments.shipment_state,
            shipments.shipment_country,
            shipments.shipment_city,
            shipments.shipment_warehouse,
            shipments.shipment_warehouse_latitude,
            shipments.shipment_warehouse_longitude
        );
        this.shipmentDetails = new ShipmentDetails(
            shipments.client_id,
            shipments.first_name,
            shipments.last_name,
            shipments.email,
            shipments.destenation_latitude,
            shipments.destenation_longitude,
            shipments.destenation_state,
            shipments.destenation_country,
            shipments.destenation_city,
            shipments.destenation_street_address
        );
    }

    public getShipmentsData(): ShipmentsData {
        return this.shipmentsData;
    }

    public setShipmentsData(shipmentsData: ShipmentsData): void {
        this.shipmentsData = shipmentsData;
    }

    public getShipmentDetails(): ShipmentDetails {
        return this.shipmentDetails;
    }

    public setShipmentDetails(shipmentDetails: ShipmentDetails): void {
        this.shipmentDetails = shipmentDetails;
    }

}