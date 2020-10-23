import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './app.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelect2Module } from 'ng-select2';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import { SidenavComponent } from './sidenav/sidenav.component';
import { VentasComponent } from './ventas/ventas.component';
import { NewventaComponent } from './newventa/newventa.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditclienteComponent } from './editcliente/editcliente.component';
import { ArituclosComponent } from './arituclos/arituclos.component';
import { EditarticuloComponent } from './editarticulo/editarticulo.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CuponesComponent } from './cupones/cupones.component';
import { EditcuponesComponent } from './editcupones/editcupones.component';

import {RelojService, valorReloj} from '../app/servicios/reloj/reloj.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    VentasComponent,
    NewventaComponent,
    ClientesComponent,
    EditclienteComponent,
    ArituclosComponent,
    EditarticuloComponent,
    ConfiguracionComponent,
    CuponesComponent,
    EditcuponesComponent
  ],
  imports: [
    RouterModule.forRoot( ROUTES, {enableTracing:true } ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot({
      showMaskTyped : true,
    }),
    HttpModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgSelect2Module
  ],
  providers: [RelojService],
  bootstrap: [AppComponent]
})
export class AppModule { }
