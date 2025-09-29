// frontend-app/src/app/app.ts
import { Component} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,              
  imports: [RouterOutlet, RouterModule, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}
