import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';

  constructor(private route: ActivatedRoute, private router: Router){}

   ngOnInit() {
  	const urlParams = new URLSearchParams(window.location.search);
    //this.router.navigate(['home']);
	  const jwt = urlParams.get('jwt');
  	if(jwt === null){
  		this.router.navigate(['login']);
  	}else{
  		this.router.navigate(['default'],{queryParams:{jwt:jwt}});
  	}
  }
}
