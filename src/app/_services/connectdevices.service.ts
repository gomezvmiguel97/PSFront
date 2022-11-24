import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectDevicesResponse } from '../_models/connectdevices.response';

@Injectable({
  providedIn: 'root'
})
export class ConnectdevicesService {

  constructor(private http: HttpClient) { }

  fingerPrint():Observable<ConnectDevicesResponse>{
  	let hh : HttpHeaders = new HttpHeaders();
    hh.set('Authorization','Bearer '+ window.sessionStorage.getItem('token'));
  	return this.http.post<ConnectDevicesResponse>('../../../connectdevices',{mensaje:'CURVE'},{headers:hh});
  }

}
