import { Constants } from "src/app/config/Constants.config";
import { ShipmentModel } from "./shipment.model";

export class ShipmentsData {
    
    private shipment_id!: string
    private shipment_status !: string 
    private shipment_place!: string
    private shipment_latitude!: number
    private shipment_longitude!: number
    private shipment_state ?: string
    private shipment_country!: string
    private shipment_city!: string 
    private shipment_warehouse !: string 
    private shipment_warehouse_latitude!: number
    private shipment_warehouse_longitude!: number

    constructor(
        shipment_id: string,
        shipment_status : string ,
        shipment_place: string,
        shipment_latitude: number,
        shipment_longitude: number,
        shipment_state: string,
        shipment_country: string,
        shipment_city: string ,
        shipment_warehouse : string ,
        shipment_warehouse_latitude: number,
        shipment_warehouse_longitude: number,
    ){
        this.shipment_id  = shipment_id;
        this.shipment_status =shipment_status;
        this.shipment_place =shipment_place;
        this.shipment_latitude=shipment_latitude;
        this.shipment_longitude=shipment_longitude;
        this.shipment_state=shipment_state;
        this.shipment_country=shipment_country;
        this.shipment_city=shipment_city;
        this.shipment_warehouse=shipment_warehouse;
        this.shipment_warehouse_latitude=shipment_warehouse_latitude;
        this.shipment_warehouse_longitude=shipment_warehouse_longitude;
    }

    public getShipment_id(): string {
        return this.shipment_id;
    }

    public setShipment_id(shipment_id: string): void {
        this.shipment_id = shipment_id;
    }

    public getShipment_status(): string {
        return this.shipment_status;
    }

    public setShipment_status(shipment_status: string): void {
        this.shipment_status = shipment_status;
    }

    public getShipment_place(): string {
        return this.shipment_place;
    }

    public setShipment_place(shipment_place: string): void {
        this.shipment_place = shipment_place;
    }

    public getShipment_latitude(): number {
        return this.shipment_latitude;
    }

    public setShipment_latitude(shipment_latitude: number): void {
        this.shipment_latitude = shipment_latitude;
    }

    public getShipment_longitude(): number {
        return this.shipment_longitude;
    }

    public setShipment_longitude(shipment_longitude: number): void {
        this.shipment_longitude = shipment_longitude;
    }

    public getShipment_state(): string | undefined {

        return this.shipment_state ? this.shipment_state : Constants.INVALID_VALUE;
    }

    public setShipment_state(shipment_state: string): void {
        
        this.shipment_state = shipment_state ? shipment_state : Constants.INVALID_VALUE;
    }

    public getShipment_country(): string {
        return this.shipment_country;
    }

    public setShipment_country(shipment_country: string): void {
        this.shipment_country = shipment_country;
    }

    public getShipment_city(): string {
        return this.shipment_city;
    }

    public setShipment_city(shipment_city: string): void {
        this.shipment_city = shipment_city;
    }

    public getShipment_warehouse(): string {
        return this.shipment_warehouse;
    }

    public setShipment_warehouse(shipment_warehouse: string): void {
        this.shipment_warehouse = shipment_warehouse;
    }

    public getShipment_warehouse_latitude(): number {
        return this.shipment_warehouse_latitude;
    }

    public setShipment_warehouse_latitude(shipment_warehouse_latitude: number): void {
        this.shipment_warehouse_latitude = shipment_warehouse_latitude;
    }

    public getShipment_warehouse_longitude(): number {
        return this.shipment_warehouse_longitude;
    }

    public setShipment_warehouse_longitude(shipment_warehouse_lomgitude: number): void {
        this.shipment_warehouse_longitude = shipment_warehouse_lomgitude;
    }



}