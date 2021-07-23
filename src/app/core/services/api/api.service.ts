import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ShipmentModel } from '../../model/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';
   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch employees list
  getShipmentsTableData(): Observable<ShipmentModel> {
    let path = "/shipments/table/data"
    return this.http.get<ShipmentModel>(this.apiURL + path)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
  }




}
