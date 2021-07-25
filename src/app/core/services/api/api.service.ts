import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ShipmentModel } from '../../model/shipment.model';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';
  defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch Shipments Table Data
  getShipmentsTableData(sort: string, order: SortDirection, page: number): Observable<Array<ShipmentModel>> {
    let headers = this.defaultHeaders
    let params = new HttpParams({
      fromObject: {
      sort,
      order,
      page
     } 
    });
    let path = "/shipments/table/data"
    return this.http.get<Array<ShipmentModel>>(this.apiURL + path , {headers,params})
  }

  getShipmentStatusBySize(shipmentStatus:string, size: number){
    let headers = this.defaultHeaders
    let params = new HttpParams({
      fromObject: {
        status: shipmentStatus,
        amount: size
      } 
    });
    let path = "/api/getShipmentStatusBySize"
    return this.http.get(this.apiURL + path , {headers,params})
  }
}
