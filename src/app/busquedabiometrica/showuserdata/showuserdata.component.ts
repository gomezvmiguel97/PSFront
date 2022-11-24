import { Component, Input, OnInit } from '@angular/core';
import { BusquedaBiometricaResponse } from '../_models/busquedabiometrica.response';
import { FormBuilder, FormGroup } from "@angular/forms";
import {Observable} from "rxjs/index";
import Viewer from 'viewerjs';
import {ImagenesPuc} from '../_models/imagenespuc';
import { DomSanitizer } from '@angular/platform-browser';
import { busquedaCURPT24Service } from '../_services/busquedaCURPT24.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-showuserdata',
  templateUrl: './showuserdata.component.html',
  styleUrls: ['./showuserdata.component.css']
})
export class ShowuserdataComponent implements OnInit {

	@Input() userdataObs : Observable<BusquedaBiometricaResponse>;
  @Input() selectOption : number;
  @Input() parametrsOption : String;
	userdata : BusquedaBiometricaResponse;
	userDataForm: FormGroup = this.formBuilder.group({
		    	nombre: [''],
		    	apellidoPat: [''],
		    	apellidoMat: [''],
		    	rfc: [''],
		    	idPuc: [''],
		    	curp: ['']
		    });
	idImages : ImagenesPuc[];
	//executeInitializeViewer : boolean = true;
  mensajeError : string;
  cargando = true;
  imagenDefault = false;
  comparacion : any;

  constructor(private formBuilder: FormBuilder, private sanitizer:DomSanitizer, private busquedaCURPT24Services : busquedaCURPT24Service) { }

  ngOnInit() {
  	this.userdataObs.subscribe(data => {
      if(data.estatus == 200){
        this.mensajeError = null;
  		  this.userdata = data;
  		  this.userDataForm.get('nombre').setValue(this.userdata.nombre);
    		this.userDataForm.get('apellidoPat').setValue(this.userdata.apellidoPat);
    		this.userDataForm.get('apellidoMat').setValue(this.userdata.apellidoMat);
    		this.userDataForm.get('rfc').setValue(this.userdata.rfc);
    		this.userDataForm.get('curp').setValue(this.userdata.curp);
    		this.idImages = this.userdata.imagenes;
        if(this.idImages==null||this.idImages.length==0){
          this.imagenDefault = true;
        }
        console.log("Los parametros: " + this.parametrsOption);
        console.log("El valor de selectOption es: " + this.selectOption.toString());
        let valorCompara = this.selectOption.toString()
        let validarCurp = this.userdata.curp;
        let vaC = this.busquedaCURPT24Services;
        this.comparacion = this.parametrsOption.split(',');
        this.comparacion.forEach(function(value) {
          console.log("el valor de value es: " + value);
          console.log("el valor de valorCompara es: " + valorCompara)
          if (valorCompara == value.toString()) {
            console.log('Se cumple la validación');
            console.log('La validación de la curp es: ' + validarCurp);
            vaC.search(validarCurp).subscribe(
              data => {
                if (data == 0) {
                  Swal.fire({
                    icon: 'success',
                    title: 'CURP VALIDA',
                    text: 'Puedes proceder a realizar la operación correspondiente',
                    allowOutsideClick: false
                  })
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'CURP INVALIDA',
                    text: 'No puedes proceder con la operación',
                    allowOutsideClick: false
                  })
                }
              },
              err => {
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR SERVIDOR',
                  text: 'Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas',
                  allowOutsideClick: false
                })
              }
            )
          }
        })
      }else{
        this.mensajeError = data.mensaje;
      }
      this.cargando = false;
	  },
    error => {
      if(error.error.mensaje != null && error.error.mensaje != ''){
        this.mensajeError = error.error.mensaje;
      } else {
        this.mensajeError = 'Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas.';
      }
      this.cargando = false;
    }
   );

  }

  	initalizeViewer(){
  		//if(this.executeInitializeViewer){
      		var gallery = document.getElementById('gallery');
			var viewer = new Viewer(gallery, {});
			//console.log("initializeViewer true");
  		//}
  		//this.executeInitializeViewer = false;
  }

  sanitize(src) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }
}
