import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {DefaultEntryComponent} from "./default-entry/default-entry.component";
import {AuthGuard} from "./_gards/auth.guard.service";
import { SearchboxComponent } from './busquedabiometrica/searchbox/searchbox.component';
import { SearchboxComponent as SearchboxNumPucComponent } from './busquedanumeropuc/searchbox/searchbox.component';
import { DatosineComponent } from './verificacionine/datosine/datosine.component';

const routes: Routes = [
	{ path: '', redirectTo:'/default', pathMatch:'full'},
	{ path: 'default', component: DefaultEntryComponent},
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard],
		children:[
			{ path: 'busqueda_biometrica', component: SearchboxComponent, canActivate: [AuthGuard] },
			{ path: 'validacion_ine', component: DatosineComponent, canActivate: [AuthGuard] },
			{ path: 'busqueda_numero_puc', component: SearchboxNumPucComponent, canActivate: [AuthGuard] }
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'disabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
