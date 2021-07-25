import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/modules/core/core.module';
import { ShipmentStatusCtrComponent } from './core/components/shipment-status-ctr/shipment-status-ctr.component';
import { ShipmentMapComponent } from './core/components/shipment-map/shipment-map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ShipmentStatusCtrComponent,
    ShipmentMapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
