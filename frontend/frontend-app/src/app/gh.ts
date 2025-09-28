import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  

import { App } from './app';
import { routes } from './app.routes';
import { ClientesList } from './components/clientes-list/clientes-list';
import { ClientesForm } from './components/clientes-form/clientes-form'; // Standalone

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    App,
    ClientesForm,
    ClientesList,
  ],
  bootstrap: [App]
})
export class AppModule {}
