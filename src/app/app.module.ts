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

import { HeaderComponent } from './header/header.component';
import { ListprospectosComponent } from './listprospectos/listprospectos.component';
import { DetalleprospectoComponent } from './detalleprospecto/detalleprospecto.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListprospectosComponent,
    DetalleprospectoComponent
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
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
