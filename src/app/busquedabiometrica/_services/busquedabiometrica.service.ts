import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {BusquedaBiometricaResponse} from "../../busquedabiometrica/_models/busquedabiometrica.response";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BusquedabiometricaService {

  constructor(private http: HttpClient) { }

  search(searchPayload)  : Observable<BusquedaBiometricaResponse> {
  	let token =  window.sessionStorage.getItem('token');
    let hh : HttpHeaders = new HttpHeaders();
    hh.set('Authorization','Bearer '+token);
    return this.http.post<BusquedaBiometricaResponse>('../../../busquedabiometrica', searchPayload);
  }
}
