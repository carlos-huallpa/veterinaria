import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { ClientesList } from './components/clientes-list/clientes-list';
import { ClientesForm } from './components/clientes-form/clientes-form';

@Component({
  selector: 'app-root',
  standalone: true,              // 👈 marca como standalone
  imports: [RouterOutlet, RouterModule, ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend-app');
}
