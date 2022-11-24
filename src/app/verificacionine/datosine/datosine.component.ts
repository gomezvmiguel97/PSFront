import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors} from "@angular/forms";
import {WebsocketService} from "../../_services/websocket.service";
import {Observable} from "rxjs/index";
import {VerificacionIneResponse} from "../_models/verificacionine.response";
import{VerificacionIneService} from "../_services/verificacionine.service";
import { BusquedabiometricacatalogoService} from "../../busquedabiometrica/_services/busquedabiometricacatalogo.service";
import { BusquedaBiometricaCatalogosResponse } from "../../busquedabiometrica/_models/busquedabiometricacatalogos.response";
import { busquedaCURPT24Service } from '../../busquedabiometrica/_services/busquedaCURPT24.service';
import Swal from 'sweetalert2';
import { ParametrsConsultaT24Service } from 'src/app/busquedabiometrica/_services/parametrs-consulta-t24.service';

@Component({
  selector: 'app-datosine',
  templateUrl: './datosine.component.html',
  styleUrls: ['./datosine.component.css']
})
export class DatosineComponent implements OnInit {

  searchForm: FormGroup;
  formSubmitted = false;
  websocketserv : WebsocketService;
  userdataObs : Observable<VerificacionIneResponse>;
  imageB64 : String;
  wsq : String;
  errorLector = false;
  descripcionRespuesta : String;
  porcentaje : number = -1.0;
  cargando=false;
  busquedaCatalogoResponse : BusquedaBiometricaCatalogosResponse;
  validacionGeneral : boolean = false;
  validacionGeneralMsj : string = "";
  mensajeCurpT24 : number;
  CurpT24 : String;
  optionSelectOperation : number;
  paramaterOptions : String;
  comparacionOptions : any;

  constructor(private formBuilder: FormBuilder, private verificacionineService : VerificacionIneService,
    private bbcs : BusquedabiometricacatalogoService, private BusquedaCURPT24Service : busquedaCURPT24Service,
    private parametrsConsultaT24 : ParametrsConsultaT24Service) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      cic: ['', [Validators.minLength(9), Validators.required]],
      ocr:['', [Validators.minLength(13), Validators.required]],
      numeroemision:[{value : '', disabled : true}],
      claveelector:[{value : '', disabled : true}],
      curp:[{value : '', disabled : true}],
      nombre:[{value : '', disabled : true}],
      apellidopaterno:[{value : '', disabled : true}],
      apellidomaterno:[{value : '', disabled : true}],
      dedo:[{value : '', disabled : true}],
      operacion: ['', [Validators.required]],
      anioemision:[{value : '', disabled : true}],
      anioregistro:[{value : '', disabled : true}]
    }/*,
    {
      validators: [this.validacionObligatorios()]
    }*/
    );

    this.obligacionDatosIne();
    this.websocketserv = new WebsocketService();

    if(this.bbcs.hayCatalogos()){
      this.busquedaCatalogoResponse = this.bbcs.getCatalogos();
    } else {
      this.bbcs.getCatalogosObs().subscribe(response => {
        this.busquedaCatalogoResponse = response;
        this.bbcs.setCatlogos(response);
      });
    }

    this.consultaParameterOption();
  }

  consultaParameterOption () {
    this.parametrsConsultaT24.search().subscribe(
      data => {
        console.log('Los parametros son: ' + data);
        this.paramaterOptions = data;
      }
    )
  }

  onSubmit(event) {
    console.log('evenet es: '+event);
    event.preventDefault();
    this.formSubmitted = true;

    if (this.searchForm.valid) {
      console.log(this.searchForm.value); // Process your form
    }
  }

  obligacionDatosIne() {
    const numeroemision = this.searchForm.get('numeroemision');
    const claveelector = this.searchForm.get('claveelector');
    const curp = this.searchForm.get('curp');
    const nombre = this.searchForm.get('nombre');
    const apellidopaterno = this.searchForm.get('apellidopaterno');
    const apellidomaterno = this.searchForm.get('apellidomaterno');
    const dedo = this.searchForm.get('dedo');
    const anioemision = this.searchForm.get('anioemision');
    const anioregistro = this.searchForm.get('anioregistro');
    const ocr = this.searchForm.get('ocr');
    const cic = this.searchForm.get('cic');
    var validacionCIC = false;
    var validacionOCR = false;

    console.log('valor de cic: ' + cic);
    console.log('valor de ocr: ' + ocr);
    cic.valueChanges.subscribe(cic => {
      console.log('Inicio proceso');
      if (cic != null && cic != '' && cic.length == 9) {
        if (validacionOCR != true){
          console.log('Las validaciones son de CIC');
          console.log('Valor de CIC: ' + cic);
          numeroemision.enable();
          numeroemision.setValidators(null);
          numeroemision.setValue(this.searchForm.controls.numeroemision.value);
          if (ocr.value != '' && ocr.value != null) {
            console.log ('Se cumple la primera condicion de ocr');
            ocr.setValidators(null);
            ocr.setValue(this.searchForm.controls.ocr.value);
          } else {
            console.log ('Se cumple la segunda condicion de ocr');
            ocr.setValidators(null);
            ocr.setValue('');
          }
          claveelector.enable();
          claveelector.setValidators(null);
          claveelector.setValue(this.searchForm.controls.claveelector.value);
          curp.enable();
          curp.setValidators([Validators.required, Validators.minLength(18)]);
          curp.setValue(this.searchForm.controls.curp.value);
          nombre.enable();
          nombre.setValidators([Validators.required]);
          nombre.setValue(this.searchForm.controls.nombre.value);
          apellidopaterno.enable();
          apellidopaterno.setValidators([Validators.required]);
          apellidopaterno.setValue(this.searchForm.controls.apellidopaterno.value);
          apellidomaterno.enable();
          apellidomaterno.setValidators([Validators.required]);
          apellidomaterno.setValue(this.searchForm.controls.apellidomaterno.value);
          dedo.enable();
          dedo.setValidators([Validators.required]);
          dedo.setValue(this.searchForm.controls.dedo.value);
          anioemision.enable();
          anioemision.setValidators(null);
          anioemision.setValue(this.searchForm.controls.anioemision.value);
          anioregistro.enable();
          anioregistro.setValidators(null);
          anioregistro.setValue(this.searchForm.controls.anioregistro.value);
          validacionCIC = true;
        }
        else {
          console.log('Las validaciones se hacen a traves de OCR');
          validacionCIC = false;
        }
      } else if (ocr.value != null && ocr.value != '' && ocr.value.length == 13) {
        validacionCIC = false;
        ocr.valueChanges.subscribe(ocr => {
          console.log('Inicio del Proceso OCR');
          if (ocr != null && ocr != '' && ocr.length == 13) {
            if(validacionCIC != true) {
              console.log('Las validaciones son de OCR');
              console.log('Valor de CIC: ' + ocr);
              numeroemision.enable();
              numeroemision.setValidators([Validators.required, Validators.minLength(2)]);
              numeroemision.setValue(this.searchForm.controls.numeroemision.value);
              if (cic.value != '' && cic.value != null) {
                console.log ('Se cumple la primera condicion de ocr');
                cic.setValidators(null);
                cic.setValue(this.searchForm.controls.cic.value);
              } else {
                console.log ('Se cumple la segunda condicion de ocr');
                cic.setValidators(null);
                cic.setValue('');
              }
              claveelector.enable();
              claveelector.setValidators([Validators.required, Validators.minLength(18)]);
              claveelector.setValue(this.searchForm.controls.claveelector.value);
              curp.enable();
              curp.setValidators([Validators.required, Validators.minLength(18)]);
              curp.setValue(this.searchForm.controls.curp.value);
              nombre.enable();
              nombre.setValidators([Validators.required]);
              nombre.setValue(this.searchForm.controls.nombre.value);
              apellidopaterno.enable();
              apellidopaterno.setValidators([Validators.required]);
              apellidopaterno.setValue(this.searchForm.controls.apellidopaterno.value);
              apellidomaterno.enable();
              apellidomaterno.setValidators([Validators.required]);
              apellidomaterno.setValue(this.searchForm.controls.apellidomaterno.value);
              dedo.enable();
              dedo.setValidators([Validators.required]);
              dedo.setValue(this.searchForm.controls.apellidomaterno.value);
              anioemision.enable();
              anioemision.setValidators(null);
              anioemision.setValue(this.searchForm.controls.anioemision.value);
              anioregistro.enable();
              anioregistro.setValidators(null);
              anioregistro.setValue(this.searchForm.controls.anioregistro.value);
              validacionOCR = true;
            }
          }
        })
      }
    });

    ocr.valueChanges.subscribe(ocr => {
      console.log('Inicio del Proceso OCR');
      if (ocr != null && ocr != '' && ocr.length == 13) {
        if(validacionCIC != true) {
          console.log('Las validaciones son de OCR');
          console.log('Valor de CIC: ' + ocr);
          numeroemision.enable();
          numeroemision.setValidators([Validators.required, Validators.minLength(2)]);
          numeroemision.setValue(this.searchForm.controls.numeroemision.value);
          if (cic.value != '' && cic.value != null) {
            console.log ('Se cumple la primera condicion de ocr');
            cic.setValidators(null);
            cic.setValue(this.searchForm.controls.cic.value);
          } else {
            console.log ('Se cumple la segunda condicion de ocr');
            cic.setValidators(null);
            cic.setValue('');
          }
          claveelector.enable();
          claveelector.setValidators([Validators.required, Validators.minLength(18)]);
          claveelector.setValue(this.searchForm.controls.claveelector.value);
          curp.enable();
          curp.setValidators([Validators.required, Validators.minLength(18)]);
          curp.setValue(this.searchForm.controls.curp.value);
          nombre.enable();
          nombre.setValidators([Validators.required]);
          nombre.setValue(this.searchForm.controls.nombre.value);
          apellidopaterno.enable();
          apellidopaterno.setValidators([Validators.required]);
          apellidopaterno.setValue(this.searchForm.controls.apellidopaterno.value);
          apellidomaterno.enable();
          apellidomaterno.setValidators([Validators.required]);
          apellidomaterno.setValue(this.searchForm.controls.apellidomaterno.value);
          dedo.enable();
          dedo.setValidators([Validators.required]);
          dedo.setValue(this.searchForm.controls.dedo.value);
          anioemision.enable();
          anioemision.setValidators(null);
          anioemision.setValue(this.searchForm.controls.anioemision.value);
          anioregistro.enable();
          anioregistro.setValidators(null);
          anioregistro.setValue(this.searchForm.controls.anioregistro.value);
          validacionOCR = true;
        }
        else {
          console.log('Las validaciones se hacen a traves de CIC');
          validacionOCR = false;
        }
        
      } else if (cic.value != null && cic.value != '' && cic.value.length == 9) {
        validacionOCR = false;
        cic.valueChanges.subscribe(cic => {
          console.log('Inicio proceso');
          if (cic != null && cic != '' && cic.length == 9) {
            if (validacionOCR != true){
              console.log('Las validaciones son de CIC');
              console.log('Valor de CIC: ' + cic);
              numeroemision.enable();
              numeroemision.setValidators(null);
              numeroemision.setValue(this.searchForm.controls.numeroemision.value);
              if (ocr.value != '' && ocr.value !=null) {
                console.log ('Se cumple la primera condicion de ocr');
                ocr.setValidators(null);
                ocr.setValue(this.searchForm.controls.ocr.value);
              } else {
                console.log ('Se cumple la segunda condicion de ocr');
                ocr.setValidators(null);
                ocr.setValue('');
              }
              claveelector.enable();
              claveelector.setValidators(null);
              claveelector.setValue(this.searchForm.controls.claveelector.value);
              curp.enable();
              curp.setValidators([Validators.required, Validators.minLength(18)]);
              curp.setValue(this.searchForm.controls.curp.value);
              nombre.enable();
              nombre.setValidators([Validators.required]);
              nombre.setValue(this.searchForm.controls.nombre.value);
              apellidopaterno.enable();
              apellidopaterno.setValidators([Validators.required]);
              apellidopaterno.setValue(this.searchForm.controls.apellidopaterno.value);
              apellidomaterno.enable();
              apellidomaterno.setValidators([Validators.required]);
              apellidomaterno.setValue(this.searchForm.controls.apellidomaterno.value);
              dedo.enable();
              dedo.setValidators([Validators.required]);
              dedo.setValue(this.searchForm.controls.dedo.value);
              anioemision.enable();
              anioemision.setValidators(null);
              anioemision.setValue(this.searchForm.controls.anioemision.value);
              anioregistro.enable();
              anioregistro.setValidators(null);
              anioregistro.setValue(this.searchForm.controls.anioregistro.value);
              validacionCIC = true;
            }
          }
      });

      }
    })
  }



  validacionObligatorios(): ValidatorFn {
  	return (searchForm: FormGroup): ValidationErrors | null => {
  		const cic = searchForm.controls['cic'];
  		const ocr = searchForm.controls['ocr'];
  		const numeroemision = searchForm.controls['numeroemision'];
  		const claveelector = searchForm.controls['claveelector'];
  		if(cic.value=='' && (ocr.value == ''||numeroemision.value == ''||claveelector.value == '')){
        //searchForm.setErrors({camposObligatorios: true});
        const errors : ValidationErrors = {camposObligatorios: true};
  	    return errors;
      }
      return null;
  	}
  }

  connectDevices(){
    this.userdataObs = null;
    this.cleanValidationResults();
    let puerto = window.sessionStorage.getItem("puerto");
    this.websocketserv.createObservableSocket('ws://localhost:'+ (puerto===null || puerto===undefined || puerto==='null'?"9051":puerto) )
     .subscribe(
          data => {  let result = JSON.parse(data);
                     this.errorLector = false;
                     this.imageB64 = null;
                     this.wsq = result.FingersResults[0].FingerWsqBase64;
                     this.cargando=true;
                     this.verify();
                     //this.respuestaEnLog();
                     this.showValidationResults();
                  },
          err => { this.websocketserv.closeConnection();
                   this.userdataObs = null;
                   this.errorLector = true;
                   this.cargando=false;
                   console.log('WebSocket error')},
          () => { this.websocketserv.closeConnection();
                  this.cargando=false;
                  console.log('WebSocket closed');
                }
      );
    this.websocketserv.sendMessage('CURVE');
  }

  verify(){
    this.searchForm.controls.ocr.setValue(String(this.searchForm.controls.ocr.value).trim().toUpperCase());
    this.searchForm.controls.cic.setValue(String(this.searchForm.controls.cic.value).trim().toUpperCase());
    this.searchForm.controls.numeroemision.setValue(String(this.searchForm.controls.numeroemision.value).trim().toUpperCase());
    this.searchForm.controls.claveelector.setValue(String(this.searchForm.controls.claveelector.value).trim().toUpperCase());
    this.searchForm.controls.curp.setValue(String(this.searchForm.controls.curp.value).trim().toUpperCase());
    this.searchForm.controls.nombre.setValue(String(this.searchForm.controls.nombre.value).trim().toUpperCase());
    this.searchForm.controls.apellidopaterno.setValue(String(this.searchForm.controls.apellidopaterno.value).trim().toUpperCase());
    this.searchForm.controls.apellidomaterno.setValue(String(this.searchForm.controls.apellidomaterno.value).trim().toUpperCase());
    this.searchForm.controls.anioemision.setValue(String(this.searchForm.controls.anioemision.value).trim().toUpperCase());
    this.searchForm.controls.anioregistro.setValue(String(this.searchForm.controls.anioregistro.value).trim().toUpperCase());
    var payload = {
      operacion: this.searchForm.controls.operacion.value,
      ocr: this.searchForm.controls.ocr.value,
      cic:this.searchForm.controls.cic.value,
      numeroemision: this.searchForm.controls.numeroemision.value,
      claveelector: this.searchForm.controls.claveelector.value,
      curp: this.searchForm.controls.curp.value,
      nombre: this.searchForm.controls.nombre.value,
      apellidopaterno: this.searchForm.controls.apellidopaterno.value,
      apellidomaterno: this.searchForm.controls.apellidomaterno.value,
      wsq: this.wsq,
      anioemision: this.searchForm.controls.anioemision.value,
      anioregistro: this.searchForm.controls.anioregistro.value,
      dedo: this.searchForm.controls.dedo.value
    };
    this.userdataObs =  this.verificacionineService.verify(payload);
    this.CurpT24 = this.searchForm.controls.curp.value;
    this.optionSelectOperation = this.searchForm.controls.operacion.value;
    $("#cancelar").click();
  }

  cancelWebSocket(){
    this.websocketserv.closeConnection();
    console.log('WebSocket closed')
  }

  limpiar(){
    this.searchForm.reset();
    this.cleanValidationResults();
    this.searchForm.controls.cic.setValue('');
    this.searchForm.controls.cic.setValidators([Validators.required, Validators.minLength(9)]);
    this.searchForm.controls.ocr.setValue('');
    this.searchForm.controls.ocr.setValidators([Validators.required, Validators.minLength(13)]);
    this.searchForm.controls.operacion.setValue('');
    this.searchForm.controls.operacion.setValidators([Validators.required]);
    this.searchForm.controls.numeroemision.setValue('');
    this.searchForm.controls.numeroemision.disable();
    this.searchForm.controls.claveelector.setValue('');
    this.searchForm.controls.claveelector.disable();
    this.searchForm.controls.curp.setValue('');
    this.searchForm.controls.curp.disable();
    this.searchForm.controls.nombre.setValue('');
    this.searchForm.controls.nombre.disable();
    this.searchForm.controls.apellidopaterno.setValue('');
    this.searchForm.controls.apellidopaterno.disable();
    this.searchForm.controls.apellidomaterno.setValue('');
    this.searchForm.controls.apellidomaterno.disable();
    this.searchForm.controls.dedo.setValue('');
    this.searchForm.controls.dedo.disable();
    this.searchForm.controls.anioemision.setValue('');
    this.searchForm.controls.anioemision.disable();
    this.searchForm.controls.anioregistro.setValue('');
    this.searchForm.controls.anioregistro.disable();
  }

  respuestaEnLog(){
    this.userdataObs.subscribe(
      data => {
        console.log('anioEmision'+data.anioEmision);
        console.log('anioRegistro'+data.anioRegistro);
        console.log('apellidomaterno'+data.apellidomaterno);
        console.log('apellidopaterno'+data.apellidopaterno);
        console.log('claveelector'+data.claveelector);
        console.log('curp'+data.curp);
        console.log('dedo'+data.dedo);
        console.log('descripcionRespuestaCCB'+data.descripcionRespuestaCCB);
        console.log('nombre'+data.nombre);
        console.log('nuneroemicion'+data.numeroemision);
        console.log('ocr'+data.ocr);
        console.log('status'+data.status);
        console.log('porcentaje'+data.porcentaje);
      },
      error => {
      console.log('Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas.');
      this.cargando = false;
    }
  );
  }

  cleanValidationResults(){
    var aei = document.getElementById("anioemision");
    aei.classList.remove("is-invalid");
    var aev = document.getElementById("anioemision");
    aev.classList.remove("is-valid");
    var ari = document.getElementById("anioregistro");
    ari.classList.remove("is-invalid");
    var arv = document.getElementById("anioregistro");
    arv.classList.remove("is-valid");
    var ami = document.getElementById("apellidomaterno");
    ami.classList.remove("is-invalid");
    var amv = document.getElementById("apellidomaterno");
    amv.classList.remove("is-valid");
    var api = document.getElementById("apellidopaterno");
    api.classList.remove("is-invalid");
    var apv = document.getElementById("apellidopaterno");
    apv.classList.remove("is-valid");
    var cri = document.getElementById("claveelector");
    cri.classList.remove("is-invalid");
    var cev = document.getElementById("claveelector");
    cev.classList.remove("is-valid");
    var ci = document.getElementById("curp");
    ci.classList.remove("is-invalid");
    var cv = document.getElementById("curp");
    cv.classList.remove("is-valid");
    var ni = document.getElementById("nombre");
    ni.classList.remove("is-invalid");
    var nv = document.getElementById("nombre");
    nv.classList.remove("is-valid");
    var nei = document.getElementById("numeroemision");
    nei.classList.remove("is-invalid");
    var nev = document.getElementById("numeroemision");
    nev.classList.remove("is-valid");
    var oi = document.getElementById("ocr");
    oi.classList.remove("is-invalid");
    var ov = document.getElementById("ocr");
    ov.classList.remove("is-valid");
    this.userdataObs = null;
    this.porcentaje = -1.0;
    this.validacionGeneral = false;
  }

  showValidationResults(){
    this.userdataObs.subscribe(
      data => {
        console.log('Validacion INE: ' + data);
        var validacion = true;
        if(data.anioEmision!=null){
          if(data.anioEmision){
            var aev = document.getElementById("anioemision");
            aev.classList.add("is-valid");
          }else{
            var aei = document.getElementById("anioemision");
            aei.classList.add("is-invalid");
            validacion = validacion && false;
          }
        }
        if(data.anioRegistro!=null){
          if(data.anioRegistro){
            var arv = document.getElementById("anioregistro");
            arv.classList.add("is-valid");
          }else{
            var ari = document.getElementById("anioregistro");
            ari.classList.add("is-invalid");
            validacion = validacion && false;
          }
        }
        if(data.apellidomaterno){
          var amv = document.getElementById("apellidomaterno");
          amv.classList.add("is-valid");
        }else{
          var ami = document.getElementById("apellidomaterno");
          ami.classList.add("is-invalid");
          validacion = validacion && false;
        }
        if(data.apellidopaterno){
          var apv = document.getElementById("apellidopaterno");
          apv.classList.add("is-valid");
        }else{
          var api = document.getElementById("apellidopaterno");
          api.classList.add("is-invalid");
          validacion = validacion && false;
        }
        if(data.claveelector!=null){
          if(data.claveelector){
            var crv = document.getElementById("claveelector");
            crv.classList.add("is-valid");
          }else{
            var cri = document.getElementById("claveelector");
            cri.classList.add("is-invalid");
            validacion = validacion && false;
          }
        }
        if(data.curp){
          var cv = document.getElementById("curp");
          cv.classList.add("is-valid");
        }else{
          var ci = document.getElementById("curp");
          ci.classList.add("is-invalid");
          validacion = validacion && false;
        }
        if(data.nombre){
          var nv = document.getElementById("nombre");
          nv.classList.add("is-valid");
        }else{
          var ni = document.getElementById("nombre");
          ni.classList.add("is-invalid");
          validacion = validacion && false;
        }
        if(data.numeroemision!=null){
          if(data.numeroemision){
            var nev = document.getElementById("numeroemision");
            nev.classList.add("is-valid");
          }else{
            var nei = document.getElementById("numeroemision");
            nei.classList.add("is-invalid");
            validacion = validacion && false;
          }
        }
        if(data.ocr != null){
          if(data.ocr){
            var ov = document.getElementById("ocr");
            ov.classList.add("is-valid");
          }else{
            var oi = document.getElementById("ocr");
            oi.classList.add("is-invalid");
            validacion = validacion && false;
          }
        }
        this.porcentaje = data.porcentaje;
        if(this.porcentaje<90){
          validacion = validacion && false;
        }
        this.cargando=false;
        this.validacionGeneral = validacion;
        if(this.validacionGeneral){
          //this.validacionGeneralMsj = "Puedes proceder a realizar la operación correspondiente";
          let optionSelect = this.optionSelectOperation.toString();
          console.log('Valor de la opción escogida: ' + optionSelect);
          let laCurp = this.CurpT24.toString();
          let vaC = this.BusquedaCURPT24Service;
          this.comparacionOptions = this.paramaterOptions.split(',');
          this.comparacionOptions.forEach(function(value) {
            if(optionSelect == value) {
              console.log('CURP a validar en T24 es: ' + laCurp);
              vaC.search(laCurp).subscribe(
                data => {
                  console.log('El mensaje de consulta de CURPT24 es: ' + data);
                  if(data == 0) {
                    Swal.fire({
                      icon: 'success',
                      title: 'INE Verificada Correctamente y CURP Valida',
                      text: 'Puedes proceder a realizar la operación correspondiente',
                      allowOutsideClick: false
                    })
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'INE Verificada Correctamente y CURP Invalida',
                      text: 'No puedes proceder con la operación',
                      allowOutsideClick: false
                    })
                  }
                },
                err => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error en el SERVIDOR',
                    text: 'Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas',
                    allowOutsideClick: false
                  })
                }
              )
            }
          });
        }else{
          if(this.porcentaje<90){
            //this.validacionGeneralMsj = "El porcentaje de validación de huella no es suficiente, no puedes proceder con la operación";
            Swal.fire({
              icon: 'error',
              title: 'Validación de Huella no Suficiente',
              text: 'El porcentaje de validación de huella no es suficiente, no puedes proceder con la operación',
              allowOutsideClick: false
            })
          } else{
            //this.validacionGeneralMsj = "Algunos datos no son correctos, por favor verifícalos e intenta de nuevo la validación";
            Swal.fire({
              icon: 'error',
              title: 'Datos Incorrectos',
              text: 'Algunos datos no son correctos, por favor verifícalos e intenta de nuevo la validación',
              allowOutsideClick: false
            })
          }
        }
      },
      error => {
      console.log('Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas. Problema verificación de INE');
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'Algo Ocurrió un error en el servidor, por favor notifícalo al área de Sistemas',
        allowOutsideClick: false
      })
      this.cargando = false;
      }
  );
  }

  cancelScanning(){
    this.websocketserv.closeConnection();
    console.log('WebSocket closed')
  }

  connectDevicesScan(lado:String){
    this.userdataObs = null;
    this.cleanValidationResults();
    let puerto = window.sessionStorage.getItem("puerto");
    console.log(puerto);
    console.log(puerto===null || puerto===undefined);
    console.log(typeof puerto);
    if (lado==='Front'){
      this.websocketserv.createObservableSocket('ws://localhost:'+ (puerto===null || puerto===undefined || puerto==='null'?"9051":puerto))
      .subscribe(
        data => {
          console.log('los datos son: ' + data);
          let result = JSON.parse(data);
          console.log('El resultado del escaneo es: ' + result);
          this.errorLector = false;
          this.cargando=false;
          this.searchForm.controls.numeroemision.enable();
          this.searchForm.controls.claveelector.enable();
          this.searchForm.controls.curp.enable();
          this.searchForm.controls.nombre.enable();
          this.searchForm.controls.apellidopaterno.enable();
          this.searchForm.controls.apellidomaterno.enable();
          this.searchForm.controls.anioemision.enable();
          this.searchForm.controls.anioregistro.enable();
          this.searchForm.controls.numeroemision.setValue(result.Emission);
          this.searchForm.controls.claveelector.setValue(result.ElectorKey);
          this.searchForm.controls.curp.setValue(result.CURP);
          this.searchForm.controls.nombre.setValue(result.Name);
          this.searchForm.controls.apellidopaterno.setValue(result.Lastname);
          this.searchForm.controls.apellidomaterno.setValue(result.MomLastname);
          this.searchForm.controls.anioemision.setValue(result.ExpeditionDate.substring(0,4));
          this.searchForm.controls.anioregistro.setValue(result.RegistryDate.substring(0,4));
          $("#cancelarScan").click();
        },
        err => {
          this.websocketserv.closeConnection();
          this.userdataObs = null;
          this.errorLector = true;
          this.cargando=false;
          console.log('WebSocket error')
        },
        () => {
          this.websocketserv.closeConnection();
          this.cargando=false;
          console.log('WebSocket closed');
        }
      );
      let documentRequest = {
        'resolution':'Res300',
        'side':'Front',
        'typeDocument':'INE'
      };
      this.websocketserv.sendMessage(JSON.stringify(documentRequest));
    }
    else if (lado==='Back') {
      this.websocketserv.createObservableSocket('ws://localhost:'+ (puerto===null || puerto===undefined || puerto==='null'?"9051":puerto))
      .subscribe(
        data => {
          console.log('los datos son: ' + data);
          let result = JSON.parse(data);
          console.log('El resultado del escaneo es: ' + result);
          this.errorLector = false;
          this.cargando=false;
          this.searchForm.controls.ocr.setValue(result.FolioOCR);
          this.searchForm.controls.cic.setValue(result.IdentificationFolio.substring(0,9));
          $("#cancelarScan").click();
        },
        err => {
          this.websocketserv.closeConnection();
          this.userdataObs = null;
          this.errorLector = true;
          this.cargando=false;
          console.log('WebSocket error')
        },
        () => {
          this.websocketserv.closeConnection();
          this.cargando=false;
          console.log('WebSocket closed');
        }
      );
      let documentRequest = {
        'resolution':'Res300',
        'side':'Back',
        'typeDocument':'INE'
      };
      this.websocketserv.sendMessage(JSON.stringify(documentRequest));
    }
    /*this.websocketserv.createObservableSocket('ws://localhost:'+ (puerto===null || puerto===undefined || puerto==='null'?"9051":puerto))
     .subscribe(
          data => {  console.log('los datos son: ' + data);
                      let result = JSON.parse(data);
                      console.log('El resultado del escaneo es: ' + result);
                     this.errorLector = false;
                     this.cargando=false;
                     if (lado==='Front'){
                      console.log('Se valida el Front');
                      this.searchForm.controls.numeroemision.enable();
                      this.searchForm.controls.claveelector.enable();
                      this.searchForm.controls.curp.enable();
                      this.searchForm.controls.nombre.enable();
                      this.searchForm.controls.apellidopaterno.enable();
                      this.searchForm.controls.apellidomaterno.enable();
                      this.searchForm.controls.anioemision.enable();
                      this.searchForm.controls.anioregistro.enable();
                       this.searchForm.controls.numeroemision.setValue(result.Emission);
                       this.searchForm.controls.claveelector.setValue(result.ElectorKey);
                       this.searchForm.controls.curp.setValue(result.CURP);
                       this.searchForm.controls.nombre.setValue(result.Name);
                       this.searchForm.controls.apellidopaterno.setValue(result.Lastname);
                       this.searchForm.controls.apellidomaterno.setValue(result.MomLastname);
                       this.searchForm.controls.anioemision.setValue(result.ExpeditionDate.substring(0,4));
                       this.searchForm.controls.anioregistro.setValue(result.RegistryDate.substring(0,4));
                     } else {
                      console.log('Se valida el BACK');
                       this.searchForm.controls.ocr.setValue(result.FolioOCR);
                       this.searchForm.controls.cic.setValue(result.IdentificationFolio.substring(0,9));
                     }
                     $("#cancelarScan").click();
                  },
          err => { this.websocketserv.closeConnection();
                   this.userdataObs = null;
                   this.errorLector = true;
                   this.cargando=false;
                   console.log('WebSocket error')},
          () => { this.websocketserv.closeConnection();
                  this.cargando=false;
                  console.log('WebSocket closed');
                }
      );
    let documentRequest = {
      'resolution':'Res300',
      'side':'Front',
      'typeDocument':'INE'
    };

    this.websocketserv.sendMessage(JSON.stringify(documentRequest));*/
  }


}
