import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>>{
    let token = window.sessionStorage.getItem('token');
    if (token) {
       request = request.clone({
         setHeaders: {
           'authorization': 'Bearer ' + token
         }
       });
    }
    return next.handle(request);
  }
}