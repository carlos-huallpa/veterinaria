import { Routes } from '@angular/router';
import { ClientesList } from './components/clientes-list/clientes-list';
import { ClientesForm } from './components/clientes-form/clientes-form';
import { MascotasList } from './components/mascotas-list/mascotas-list';
import { MascotasForm } from './components/mascotas-form/mascotas-form';
import { MedicosList } from './components/medicos-list/medicos-list';
import { MedicosForm } from './components/medicos-form/medicos-form';
import { TurnosList } from './components/turnos-list/turnos-list';
import { TurnosForm } from './components/turnos-form/turnos-form';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes-list', pathMatch: 'full' },
  { path: 'clientes-list', component: ClientesList },
  { path: 'clientes-form', component: ClientesForm },
  { path: 'clientes-form/:id', component: ClientesForm },
  { path: 'mascotas-list', component: MascotasList },
  { path: 'mascotas-form', component: MascotasForm },
  { path: 'mascotas-form/:id', component: MascotasForm },
  { path: 'medicos-list', component: MedicosList },
  { path: 'medicos-form', component: MedicosForm },
  { path: 'medicos-form/:id', component: MedicosForm },
  { path: 'turnos-list', component: TurnosList},
  { path: 'turnos-form', component: TurnosForm},
  { path: 'turnos-form/:id', component: TurnosForm}

];
