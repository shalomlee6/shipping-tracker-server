import { Component, Input, OnInit, Output, EventEmitter, SimpleChange, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import { ShipmentUtils } from 'src/app/Utils/shipment.utils';
import { ShipmentList } from '../../model/shipment-list.model';
import { ShipmentModel } from '../../model/shipment.model';
import { ApiService } from '../../services/api/api.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ShipmentsData } from '../../model/shipment-data.model';
import { shipment } from '../../model/shipment.interface';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {

  displayArray!: Array<ShipmentsData>;
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  dataRes!: ShipmentsData[];
  tableColumns!: Array<string>;
  shipmentList!: ShipmentList;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() shipmentListUpdate!: ShipmentList;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() shipmentRecord = new EventEmitter<any>();

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.displayArray = [];
    // this.getShipments()
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.apiService.getShipmentsTableData(this.sort.active, this.sort.direction, this.paginator.pageIndex)
          .pipe(catchError(() => observableOf(null)));
      }),
      map( (data:any) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) { return []; }
        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        let arr: Array<any> =  data?.shipmentData ? data.shipmentData : [];
        this.resultsLength = arr.length;

        this.shipmentList = new ShipmentList(data);
        this.displayedColumns = this.shipmentList.getHeaders();
        this.displayArray = ShipmentUtils.generateShipmentDataSrc(this.shipmentList.getShipmentList());

        return this.displayArray;
      })
    ).subscribe(data => this.dataRes = data);
  }
  
  ngOnChanges(simpleChange: SimpleChange) {
    if(this.shipmentListUpdate) {
      this.shipmentList = new ShipmentList(this.shipmentListUpdate);
      this.displayedColumns = this.shipmentList.getHeaders();
      this.displayArray = ShipmentUtils.generateShipmentDataSrc(this.shipmentList.getShipmentList());
    }
  }
  
  getRecord(row: shipment){
    // console.table(row);
    //TODO check for null
    let shipmentRecord: ShipmentModel | undefined = this.shipmentList.getShipmentList().get( String(row?.shipment_id) );
    this.shipmentRecord.emit(shipmentRecord);
  }

  generateDataModelForTable(map: Map<string, ShipmentModel>) {

    this.displayArray = ShipmentUtils.generateShipmentDataSrc(map);
    this.listData = new MatTableDataSource(this.displayArray);

  }

}


