import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import {BehaviorSubject,Observable} from "rxjs/index";
import {LoginResponse} from "../_models/login.response";
import {ValidacionJwtResponse} from "../_models/validacionjwt.response";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private currentUserSubject: BehaviorSubject<boolean>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<boolean>(false);
	}

	public get currentUserValue(): boolean {
        return this.currentUserSubject.getValue();
    }

  login(loginPayload) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>('../../authenticate', loginPayload,{observe : 'response'})
   		.pipe(
   			map(response =>{
   				if(response.status == 200){
   					this.currentUserSubject.next(true);
   				}
   				return response.body;
   			})
   			)
   	;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  validateToken(jwt){
    return this.http.post<ValidacionJwtResponse>('../../validacionjwt', jwt,{observe : 'response'})
       .pipe(
         map(response =>{
           if(response.status == 200){
             this.currentUserSubject.next(true);
           }
           return response.body;
         })
         );
  }
}
