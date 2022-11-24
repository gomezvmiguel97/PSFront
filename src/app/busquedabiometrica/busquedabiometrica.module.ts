import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowuserdataComponent } from './showuserdata/showuserdata.component';



@NgModule({
  declarations: [SearchboxComponent, ShowuserdataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SearchboxComponent, ShowuserdataComponent]
})
export class BusquedabiometricaModule { }
