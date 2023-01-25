import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
  	invalidLogin: boolean = false;
	mensajeLogin : string;

  	constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

	  connectDevices() {
		let puerto = window.sessionStorage.getItem("puerto");
		console.log('El puerto est: ' + puerto);
	  }  	
	
	onSubmit() {
		    if (this.loginForm.invalid) {
		    	return;
		    }
		    const loginPayload = {
		    	username: String(this.loginForm.controls.username.value).padStart(8,'0'),
		      	password: btoa(this.loginForm.controls.password.value)
		    }
		    this.loginService.login(loginPayload).subscribe(data => {
		      	if(data.jwt != null) {
		        	window.sessionStorage.setItem('token', data.jwt);
		        	this.router.navigate(['home']);
		      	}else {
					Swal.fire({
						icon: 'error',
						title: data.mensaje
					  })
		        	/*this.invalidLogin = true;
		        	this.mensajeLogin = data.mensaje;*/
		      	}
		    });
	  	}

	  	ngOnInit() {	
		    window.sessionStorage.removeItem('token');
		    this.loginForm = this.formBuilder.group({
		    	username: ['', Validators.compose([Validators.required])],
		    	password: ['', Validators.required]
		    });
		    //this.loginForm.controls.username.setValue("D9999999");
		    console.log("puerto obtenido: "+window.sessionStorage.getItem("puerto"));
	  	}

}