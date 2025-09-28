import { Routes } from '@angular/router';
import { ClientesList } from './components/clientes-list/clientes-list';
import { ClientesForm } from './components/clientes-form/clientes-form';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes-list', pathMatch: 'full' },
  { path: 'clientes-list', component: ClientesList },
  { path: 'clientes-form', component: ClientesForm },
  { path: 'clientes-form/:id', component: ClientesForm },
];
