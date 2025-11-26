import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasService, Mascota } from '../../../services/mascotas';
import { MedicosService, Medico } from '../../../services/medicos';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-list.html',
  styleUrls: ['../../../styles/lists.css']
})
export class DashboardList implements OnInit {

  @Input() proximosTurnos: any[] = [];
  @Input() ultimosTurnos: any[] = [];
  @Input() mascotas: Mascota[] = [];
  @Input() medicos: Medico[] = [];

  constructor(
    private mascotasService: MascotasService,
    private medicosService: MedicosService
  ) {}

  ngOnInit() {
    this.fetchMascotas();
    this.fetchMedicos();
  }

  fetchMascotas(): void {
    this.mascotasService.getMascotas().subscribe({
      next: data => this.mascotas = data,
      error: () => console.warn('Error cargando mascotas')
    });
  }

  fetchMedicos(): void {
    this.medicosService.getMedicos().subscribe({
      next: data => this.medicos = data,
      error: () => console.warn('Error cargando médicos')
    });
  }

  getMascotaNombre(id: number): string {
    const mascota = this.mascotas.find(m => m.id === id);
    return mascota ? mascota.nombre : 'Desconocido';
  }

  getMedicoNombre(id: number): string {
    const medico = this.medicos.find(m => m.id === id);
    return medico ? `Dr/a. ${medico.apellido}, ${medico.nombre}` : 'Desconocido';
  }
}
