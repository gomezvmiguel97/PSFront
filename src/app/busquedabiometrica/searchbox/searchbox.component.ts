import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusquedabiometricaService} from "../_services/busquedabiometrica.service";
import {busquedaCURPT24Service} from "../_services/busquedaCURPT24.service"
import {BusquedaCurpT24Response} from "../_models/busquedaCURPT24.response"
import {WebsocketService} from "../../_services/websocket.service";
import {ConnectdevicesService} from "../../_services/connectdevices.service";
import { BusquedaBiometricaResponse } from '../_models/busquedabiometrica.response';
import { Observable } from "rxjs/index";
import { BusquedabiometricacatalogoService} from "../_services/busquedabiometricacatalogo.service";
import { BusquedaBiometricaCatalogosResponse } from "../_models/busquedabiometricacatalogos.response";
import Swal from 'sweetalert2';
import { ParametrsConsultaT24Service } from '../_services/parametrs-consulta-t24.service';

@Component({
  selector: 'app-searchboxnp',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  searchForm: FormGroup;
  //userdata : BusquedaBiometricaResponse;
  userdataObs : Observable<BusquedaBiometricaResponse>;
  radioValue : number;
  websocketserv : WebsocketService;
  imageB64 : String;
  wsq : String;
  mensaje: number;
  errorLector = false;
  busquedaCatalogoResponse : BusquedaBiometricaCatalogosResponse;
  busquedaCurpT24Response : Observable<BusquedaCurpT24Response>;
  identif : String;
  valorOptions : number;
  parametersOptions : String;

  constructor(private formBuilder: FormBuilder, private busquedabiometricaService : BusquedabiometricaService, private connectDevicesService : ConnectdevicesService,
    private BusquedaCURPT24Service : busquedaCURPT24Service, private bbcs : BusquedabiometricacatalogoService, private parametrsConsultaT24 : ParametrsConsultaT24Service) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      identificador: ['', Validators.required],
      operacion:['',  Validators.required]
    });
   
    this.websocketserv = new WebsocketService();
    this.mensaje = 2;

    if(this.bbcs.hayCatalogos()){
      this.busquedaCatalogoResponse = this.bbcs.getCatalogos();
    } else {
      this.bbcs.getCatalogosObs().subscribe(response => {
        this.busquedaCatalogoResponse = response;
        this.bbcs.setCatlogos(response);
      });
    }
    this.validarParametros();
  }

validarParametros(){
  this.parametrsConsultaT24.search().subscribe(
    data => {
      console.log('Los paramteros para consultar T24 son: ' + data);
      this.parametersOptions = data;
    }
  );
}

  validarCurpT24(valorSelect) {
    console.log('El valor del select es: ', valorSelect);
    this.valorOptions = valorSelect;
    /*console.log('El valor del radioButton es: ', this.radioValue)
    console.log('El valor del input text es: ', this.searchForm.controls.identificador.value)
    if (this.radioValue == 1) {
      console.log('Se cumple la primera Condicion')
      if ((valorSelect == 1)){
        console.log('Se cumple la segunda Condicion')
        var curp = this.searchForm.controls.identificador.value.toUpperCase();
        this.BusquedaCURPT24Service.search(curp).subscribe(
          data => {
            console.log("El resultado es: ", data);
            this.mensaje = data;
            if (this.mensaje == 0) {
              Swal.fire({
                icon: 'success',
                title: 'CURP VALIDA'
              })
            } else if (this.mensaje == 1) {
              Swal.fire({
                icon: 'error',
                title: 'CURP INVALIDA'
              })
            }
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'ERROR SERVIDOR'
            })
          }
        );
      }
      else {
        this.mensaje = 2;
      }
    }
    else {
      this.mensaje = 2;
    }*/
  }

  search(wsq: String){
    if(this.radioValue == 1) {
      this.identif = this.searchForm.controls.identificador.value.toUpperCase();
    } else if (this.radioValue == 2) {
      this.identif = this.searchForm.controls.identificador.value.toUpperCase();
    } else if (this.radioValue == 3) {
      this.identif = String(this.searchForm.controls.identificador.value)
    }
    var payload = {
      identificador: this.identif,
      tipoId:this.radioValue,
      operacion:this.searchForm.controls.operacion.value,
      wsq: wsq
    };
    this.userdataObs =  this.busquedabiometricaService.search(payload);
    $("#cancelar").click();
    // this.userdataObs.subscribe(data => {
    //       debugger;
    //         if(data.status === 200) {
    //           this.userdata = data;
    //           console.log(data);
    //         }else {
    //           this.userdata = null;
    //           alert(data.message);
    //         }
    //     });
  }

  onRadioChange(value){
    this.radioValue = value;
    this.searchForm.controls.operacion.setValue('');
    this.mensaje = 2
    if(value == 1) {
      this.searchForm.controls.identificador.setValue('');
      this.searchForm.controls.identificador.setValidators([Validators.required, Validators.minLength(18)]);
    } else if (value == 2) {
      this.searchForm.controls.identificador.setValue('');
      this.searchForm.controls.identificador.setValidators([Validators.required, Validators.minLength(12)]);
    } else if (value == 3) {
      this.searchForm.controls.identificador.setValue('');
      this.searchForm.controls.identificador.setValidators([Validators.required]);
    }
  }

  stratcapture(){
    this.userdataObs = null;
    this.websocketserv.createObservableSocket('ws://localhost:5000')
      .subscribe(
          data => {
                   let result = JSON.parse(data);
                   if(result.CURVE_RESPONSE){
                     this.errorLector = false;
                     this.imageB64 = result.CURVE_RESPONSE.imageB64;
                     this.wsq = result.CURVE_RESPONSE.wsq;
                     this.search(this.wsq);
                     console.log(this.wsq);
                   }
                  },
          err => { this.websocketserv.closeConnection();
                   this.userdataObs = null;
                   this.errorLector = true;
                   console.log('WebSocket error')},
          () => { this.websocketserv.closeConnection();
                  console.log('WebSocket closed')
                }
      );
    this.websocketserv.sendMessage('CURVE_SCAN');
  }

  cancelWebSocket(){
    this.websocketserv.closeConnection();
    console.log('WebSocket closed')
  }

  connectDevices(){
    this.userdataObs = null;
    let puerto = window.sessionStorage.getItem("puerto");
    this.websocketserv.createObservableSocket('ws://localhost:'+ (puerto===null || puerto===undefined || puerto==='null'?"9051":puerto))
     .subscribe(
          data => {  let result = JSON.parse(data);
                     this.errorLector = false;
                     this.imageB64 = null;
                     this.wsq = result.FingersResults[0].FingerWsqBase64;
                     this.search(this.wsq);
                  },
          err => { this.websocketserv.closeConnection();
                   this.userdataObs = null;
                   this.errorLector = true;
                   console.log('WebSocket error')},
          () => { this.websocketserv.closeConnection();
                  console.log('WebSocket closed');
                }
      );
    this.websocketserv.sendMessage('CURVE');
  }

  connectDecivesCitrix(){
    this.userdataObs = null;
    this.connectDevicesService.fingerPrint()
    .subscribe(
      data => {
        this.errorLector = false;
        this.wsq = data.cdsr.FingersResults[0].FingerWsqBase64;
        this.imageB64 = null;
        this.search(this.wsq);
        console.log(this.wsq);
      },
      error =>{
        this.userdataObs = null;
        this.errorLector = true;
        console.log('WebSocket error');
      }
    );
  }

  limpiar(){
    this.userdataObs = null;
    this.searchForm.reset();
  }

}
