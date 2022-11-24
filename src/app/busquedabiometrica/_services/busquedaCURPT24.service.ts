import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject,Observable} from "rxjs/index";
import {BusquedaCurpT24Response} from "../../busquedabiometrica/_models/busquedaCURPT24.response";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class busquedaCURPT24Service {

    constructor(private http: HttpClient) { }

    search(curp24 : String)  : Observable<any> {
      console.log("Servidor Curp: ", curp24);
        return this.http.post<any>('../../../servicesT24/curpT24?curp=' + curp24,curp24);
    }
  }