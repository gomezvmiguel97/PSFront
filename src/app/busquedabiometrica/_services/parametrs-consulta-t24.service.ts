import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrsConsultaT24Service {

  constructor(private http: HttpClient) { }

  search() : Observable<any>{
    return this.http.get<any>('../../../parameters/optionsT24');
  }
}
