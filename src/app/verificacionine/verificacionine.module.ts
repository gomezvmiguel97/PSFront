import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosineComponent } from './datosine/datosine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatosineComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DatosineComponent]
})
export class VerificacionineModule { }
