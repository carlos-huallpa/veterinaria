import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,              // 👈 marca como standalone
  imports: [RouterOutlet, ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}
