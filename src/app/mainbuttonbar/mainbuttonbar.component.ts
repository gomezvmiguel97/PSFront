import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from '../_services/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainbuttonbar',
  templateUrl: './mainbuttonbar.component.html',
  styleUrls: ['./mainbuttonbar.component.css']
})
export class MainbuttonbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  	$(document).ready(function () {
    	$('#sidebarCollapse').on('click', function () {
        	$('#sidebar').toggleClass('active');
          $('#sidebarCollapseicon').toggleClass('glyphicon-menu-right');
        });
	  });
  }

  logout() {
    this.loginService.logout();
    window.sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
