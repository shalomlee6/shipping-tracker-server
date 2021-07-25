import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/config/Constants.config';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  loader!: Loader;
  googleMaps: any;
  mapStatusUpdate = new Subject<string>();
  constructor() { }

  async getGoogleMaps() {
    if (!this.loader) {
      this.loader = new Loader(
        {
          apiKey: Constants.API_KEY,
          version: "weekly",
          libraries: ["geometry"],
        }
      );
    }

    if (!this.googleMaps) {
      this.googleMaps = await this.loader.load();
    }
    return this.googleMaps;
  }

  onStatus(): Observable<string>  {
    return this.mapStatusUpdate.asObservable();
  }

  onStatusUpdate(status: string) {
    this.mapStatusUpdate.next(status);
  }

}
