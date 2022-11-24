import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject,Observable} from "rxjs/index";
import {BusquedaBiometricaCatalogosResponse} from "../_models/busquedabiometricacatalogos.response";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedabiometricacatalogoService {

  busquedaBiometricaCatalogos : BusquedaBiometricaCatalogosResponse;

  constructor(private http: HttpClient) { }

  getCatalogosObs() : Observable<BusquedaBiometricaCatalogosResponse> {
  	return this.http.post<BusquedaBiometricaCatalogosResponse>('../../../busquedabiometricaCatalogo', {});
  }

  getCatalogos() : BusquedaBiometricaCatalogosResponse{
  	return this.busquedaBiometricaCatalogos;
  }

  hayCatalogos() : boolean {
  	return !(this.busquedaBiometricaCatalogos == null || this.busquedaBiometricaCatalogos == undefined);
  }

  setCatlogos(bbc : BusquedaBiometricaCatalogosResponse) {
  	this.busquedaBiometricaCatalogos = bbc;
  }

  /**
  getCatalogos():BusquedaBiometricaCatalogosResponse {
  	if(this.busquedaBiometricaCatalogos == null || this.busquedaBiometricaCatalogos == undefined ){
  		this.getCatalogosObs().subscribe(response => {
  			this.busquedaBiometricaCatalogos = response;
  			return this.busquedaBiometricaCatalogos;
  			});

  	}else{
  		return this.busquedaBiometricaCatalogos;
  	}
  }*/

}
