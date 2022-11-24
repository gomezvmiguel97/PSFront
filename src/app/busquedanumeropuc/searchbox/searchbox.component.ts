import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusquedanumeropucService} from "../../busquedanumeropuc/_services/busquedanumeropuc.service";
import { BusquedaNumeroPucResponse } from '../_models/busquedanumeropuc.response';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-searchboxnp',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  searchForm: FormGroup;
  userdata : BusquedaNumeroPucResponse;
  userdataObs : Observable<BusquedaNumeroPucResponse>;
  radioValue : String;

  constructor(private formBuilder: FormBuilder, private busquedanumeropucService : BusquedanumeropucService) {}

  ngOnInit() {
	this.searchForm = this.formBuilder.group({
		numeroPuc: ['', Validators.required]
	});
  }

  search(){
  	var payload = {
      numeroPuc: this.searchForm.controls.numeroPuc.value
    };
    this.userdataObs =  this.busquedanumeropucService.search(payload);
    // this.userdataObs.subscribe(data => {
    //       debugger;
    //         if(data.status === 200) {
    //           this.userdata = data;
    //           console.log(data);
    //         }else {
    //           this.userdata = null;
    //           alert(data.message);
    //         }
    //     });
  }

  onRadioChange(value){
    this.radioValue = value;
  }

}
