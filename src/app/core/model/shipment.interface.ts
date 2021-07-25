export interface shipment {
    shipment_id: string
    shipment_status: string 
    shipment_place: string
    shipment_latitude: number
    shipment_longitude: number
    shipment_state ?: string
    shipment_country: string
    shipment_city: string 
    shipment_warehouse : string 
    shipment_warehouse_latitude: number
    shipment_warehouse_lomgitude: number
}