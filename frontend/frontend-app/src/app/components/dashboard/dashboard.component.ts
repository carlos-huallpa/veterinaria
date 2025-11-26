import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { CommonModule } from '@angular/common';

import { DashboardCards } from './dashboard-cards/dashboard-cards.component';
import { DashboardGraph } from './dashboard-graph/dashboard-graph.component';
import { DashboardList } from './dashboard-list/dashboard-list';
import { MedicosService } from '../../services/medicos';
import { MascotasService } from '../../services/mascotas';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardCards, DashboardList, DashboardGraph],
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../styles/lists.css']
})


export class DashboardComponent implements OnInit {


  loading = false;
  error = '';
  data: any;

  mascotas: any[] = [];
  medicos: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private mascotasService: MascotasService,
    private medicosService: MedicosService
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
    this.mascotasService.getMascotas().subscribe({
      next: (data) => this.mascotas = data,
    });

    this.medicosService.getMedicos().subscribe({
      next: (data) => this.medicos = data,
    });
  
  }

  cargarDashboard() {
    this.loading = true;

    this.dashboardService.obtenerDashboard().subscribe({
      next: (data) => {
        this.loading = false;
        this.data = data;
        console.log("TOP MEDICO:", this.data.top_medico);
      },
      error: () => {
        this.loading = false;
        this.error = 'Error cargando el dashboard';
        console.log("TOP MEDICO:", this.data.top_medico);
      }
    });
  }



}
