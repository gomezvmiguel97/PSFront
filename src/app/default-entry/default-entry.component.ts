import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";

@Component({
  selector: 'app-default-entry',
  templateUrl: './default-entry.component.html',
  styleUrls: ['./default-entry.component.css']
})
export class DefaultEntryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  	var jwt: string = this.route.snapshot.queryParamMap.get('jwt');
  	if(jwt === null){
  		console.log('No porta jwt');
  		this.router.navigate(['login']);
  	}else{
  		var json = {jwt: jwt};
  		this.loginService.validateToken(json).subscribe(data => {
		      	if(data.valido) {
		        	window.sessionStorage.setItem('token', jwt);
		        	this.router.navigate(['home']);
		      	}else {
		      		console.log('jwt no válido');
		        	this.router.navigate(['login']);
		      	}
		    });
  	}
  }

}
