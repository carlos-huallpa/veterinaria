import { Routes } from '@angular/router';
import { ClientesList } from './components/clientes-list/clientes-list';
import { ClientesForm } from './components/clientes-form/clientes-form';
import { MascotasList } from './components/mascotas-list/mascotas-list';
import { MascotasForm } from './components/mascotas-form/mascotas-form';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes-list', pathMatch: 'full' },
  { path: 'clientes-list', component: ClientesList },
  { path: 'clientes-form', component: ClientesForm },
  { path: 'clientes-form/:id', component: ClientesForm },
  { path: 'mascotas-list', component: MascotasList },
  { path: 'mascotas-form', component: MascotasForm },
  { path: 'mascotas-form/:id', component: MascotasForm },
];
