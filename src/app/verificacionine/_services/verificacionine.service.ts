import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {VerificacionIneResponse} from "../_models/verificacionine.response";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificacionIneService {

	constructor(private http: HttpClient) { }

	verify(searchPayload)  : Observable<VerificacionIneResponse> {
    console.log("Ejecuta verify en service");

  	let token =  window.sessionStorage.getItem('token');
    let hh : HttpHeaders = new HttpHeaders();
    hh.set('Authorization','Bearer '+token);
    return this.http.post<VerificacionIneResponse>('../../../validacionine', searchPayload);

  }
}