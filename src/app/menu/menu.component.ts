import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import {Router} from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	busqueda_biometrica_route : string = "busqueda_biometrica";
  busqueda_numero_puc_route : string = "busqueda_numero_puc";
  validacion_ine_route : string = "validacion_ine";
  token : string;
  nombreUsuario : string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.token = window.sessionStorage.getItem('token');
    var tokenObj = jwt_decode(this.token);
    this.nombreUsuario = tokenObj.nombreOperador;
  }

  dummy(){
  	alert("Sin funcionalidad");
  }

  logout() {
    this.loginService.logout();
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('puerto');
    this.router.navigate(['home']);
  }

}
