import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {BusquedaNumeroPucResponse} from "../../busquedanumeropuc/_models/busquedanumeropuc.response";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BusquedanumeropucService {

  constructor(private http: HttpClient) { }

  search(searchPayload)  : Observable<BusquedaNumeroPucResponse> {

    let token =  window.sessionStorage.getItem('token');
    let hh : HttpHeaders = new HttpHeaders();
    hh.set('Authorization','Bearer '+token);

  	return this.http.post<BusquedaNumeroPucResponse>('http://10.1.2.177:8080/portalservicios/' + 'busquedanumeropuc', searchPayload, {observe : 'response', headers: hh})
  	.pipe(
   			map(response =>{
   				if(response.status == 200){
   					console.log("busquedanumeropuc")
   				}
   				return response.body;
   			})
   			)
   	;

  }
}
