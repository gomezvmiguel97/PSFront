import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BusquedabiometricaModule } from './busquedabiometrica/busquedabiometrica.module';
import { BusquedanumeropucModule } from './busquedanumeropuc/busquedanumeropuc.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./_interceptor/token.interceptor";
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MainbuttonbarComponent } from './mainbuttonbar/mainbuttonbar.component';
import { DefaultEntryComponent } from './default-entry/default-entry.component';
import { VerificacionineModule } from './verificacionine/verificacionine.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    MainbuttonbarComponent,
    DefaultEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BusquedabiometricaModule,
    BusquedanumeropucModule,
    VerificacionineModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
