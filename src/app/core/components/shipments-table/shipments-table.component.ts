import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/config/Constants.config';
import { ShipmentModel } from 'src/app/core/model/shipment.model';
import { ShipmentsData } from '../../model/shipment-data.model';
import { ShipmentList } from '../../model/shipment-list.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-shipments-table',
  templateUrl: './shipments-table.component.html',
  styleUrls: ['./shipments-table.component.css']
})
export class ShipmentsTableComponent implements OnInit {

  tableDataSrc!: Array<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  listData!: MatTableDataSource<any>
  @Input() shipments!: ShipmentList;
  constructor() { }

  ngOnInit(): void {

  }
 
  ngOnChanges(simpleChange: SimpleChange) {
    if(this.shipments) {
      // this.listData = new MatTableDataSource( this.shipments[0].getShipmentsData() );
      this.generateDataModelForTable()
      // this.uodateTableView();
    }
  }
  uodateTableView() {
    
  }
  
  generateDataModelForTable() {

  //  let data = this.shipments.get(Constants.SHIPMENT_MODEL_ID)

  //  this.tableDataSrc = this.shipments.map( (item:any ) => {
  //    let a = item;
  //     return {
  //       shipment_id: item.shipment_id,
  //       shipment_status: item.getShipmentsData().getShipment_status(),
  //       shipment_place: item.getShipmentsData().getShipment_place(),
  //       shipment_latitude: item.getShipmentsData().getShipment_latitude(),
  //       shipment_longitude: item.getShipmentsData().getShipment_longitude(),
  //       shipment_state: item.getShipmentsData().getShipment_state(),
  //       shipment_country: item.getShipmentsData().getShipment_country(),
  //       shipment_city: item.getShipmentsData().getShipment_city(),
  //       shipment_warehouse: item.getShipmentsData().getShipment_warehouse(),
  //       shipment_warehouse_latitude: item.getShipmentsData().getShipment_warehouse_latitude(),
  //       shipment_warehouse_lomgitude: item.getShipmentsData().getShipment_warehouse_lomgitude()
  //     }
  //   })


  //   this.displayedColumns = [ "shipment_id", "shipment_status" ];

    // this.dataSource = [
      
    // ]


  }
}


  // shipment_id: this.shipment.getShipmentsData().getShipment_id(),
  // shipment_status:
  // shipment_place:
  // shipment_latitude:
  // shipment_longitude:
  // shipment_state:
  // shipment_country:
  // shipment_city:
  // shipment_warehouse:
  // shipment_warehouse_latitude:
  // shipment_warehouse_lomgitude:

      // this.dataSource = [
    //   {
    //     shipment_id: this.shipment.getShipmentsData().getShipment_id(),
    //     shipment_status: this.shipment.getShipmentsData().getShipment_state()

    //   }
       
    //     // shipment_id: this.shipment.getShipmentsData().getShipment_id(),
    //     // shipment_status:
    //     // shipment_place:
    //     // shipment_latitude:
    //     // shipment_longitude:
    //     // shipment_state:
    //     // shipment_country:
    //     // shipment_city:
    //     // shipment_warehouse:
    //     // shipment_warehouse_latitude:
    //     // shipment_warehouse_lomgitude:
      
    // ]
      // let datasrc = this.shipment.getShipmentsData().
      // this.dataSource = this.shipment.getShipmentsData();

      // console.table(this.shipment)