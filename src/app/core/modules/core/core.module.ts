import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsTableComponent } from '../../components/shipments-table/shipments-table.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ShipmentsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    ShipmentsTableComponent
  ]
})
export class CoreModule { }
