import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.css'
})
export class DashboardCards {
  @Input() mesActual!: number;
  @Input() mesAnterior!: number;
  @Input() mesRatioDif!: number;
  @Input() topMedicoMes!: any;
}