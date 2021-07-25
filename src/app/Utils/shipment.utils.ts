import { shipment } from "../core/model/shipment.interface";
import { ShipmentModel } from "../core/model/shipment.model";

export class ShipmentUtils {

    public static generateShipmentDataSrc(map: Map<string,ShipmentModel>) : Array<any> {
        let res: Array<any> = [];
        for(let value of map.values() ) {
            res.push({ 
                shipment_id: value.getShipmentsData().getShipment_id(),
                shipment_status : value.getShipmentsData().getShipment_status() ,
                shipment_place: value.getShipmentsData().getShipment_place(),
                shipment_latitude: value.getShipmentsData().getShipment_latitude(),
                shipment_longitude: value.getShipmentsData().getShipment_longitude(),
                shipment_state: value.getShipmentsData().getShipment_state(),
                shipment_country: value.getShipmentsData().getShipment_country(),
                shipment_city:  value.getShipmentsData().getShipment_city(),
                shipment_warehouse :  value.getShipmentsData().getShipment_warehouse(),
                shipment_warehouse_latitude: value.getShipmentsData().getShipment_warehouse_latitude(),
                shipment_warehouse_longitude: value.getShipmentsData().getShipment_warehouse_longitude()
            });
            
        }
        return res
    }

    public static generateColumnDataStructureForTableView(headers: Array<string>) : Array<any>{
        let res: Array<any> = [
            { cell: (element: shipment) => `${element.shipment_id}` },
            { cell: (element: shipment) => `${element.shipment_status}` },
            { cell: (element: shipment) => `${element.shipment_place}` },
            { cell: (element: shipment) => `${element.shipment_latitude}` },
            { cell: (element: shipment) => `${element.shipment_longitude}` },
            { cell: (element: shipment) => `${element.shipment_state}` },
            { cell: (element: shipment) => `${element.shipment_country}` },
            { cell: (element: shipment) => `${element.shipment_city}` },
            { cell: (element: shipment) => `${element.shipment_warehouse}` },
            { cell: (element: shipment) => `${element.shipment_warehouse_latitude}` },
            { cell: (element: shipment) => `${element.shipment_warehouse_lomgitude}` },
        ];

        for(let i = 0; i < res.length; i++ ) {
            res[i].columnDef = headers[i];
            res[i].header = headers[i];
        }
        return res;
    }



}