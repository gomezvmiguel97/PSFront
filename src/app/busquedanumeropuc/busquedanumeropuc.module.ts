import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedabiometricaModule } from '../busquedabiometrica/busquedabiometrica.module';


@NgModule({
  declarations: [SearchboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusquedabiometricaModule
  ],
  exports: [SearchboxComponent]
})
export class BusquedanumeropucModule { }
