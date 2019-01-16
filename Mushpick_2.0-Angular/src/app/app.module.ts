import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import {APP_ROUTING} from './app.routes';

import { AppComponent } from './app.component';
import { IdentificarComponent } from './components/identificar/identificar.component';
import { ListadoComponent } from './components/listado/listado.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { DetalleSetaComponent } from './components/detalle-seta/detalle-seta.component';

@NgModule({
  declarations: [
    AppComponent,
    IdentificarComponent,
    ListadoComponent,
    AyudaComponent,
    DetalleSetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
