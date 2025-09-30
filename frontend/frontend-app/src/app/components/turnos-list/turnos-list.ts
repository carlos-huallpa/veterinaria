// frontend-app/src/app/components/turnos-list/turnos-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurnosService, Turno } from '../../services/turnos';
import { MascotasService, Mascota } from '../../services/mascotas';
import { MedicosService, Medico } from '../../services/medicos';

@Component({
  selector: 'app-turnos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './turnos-list.html',
  styleUrls: ['../../styles/lists.css']
})
export class TurnosList implements OnInit {
  turnos: Turno[] = [];
  mascotas: Mascota[] = [];
  medicos: Medico[] = [];
  loading = false;
  error = '';

  constructor(
    private turnosService: TurnosService,
    private mascotasService: MascotasService,
    private medicosService: MedicosService
  ) {}

  ngOnInit(): void {
    this.fetchTurnos();
    this.fetchMascotas();
    this.fetchMedicos();
  }

  fetchTurnos(): void {
    this.loading = true;
    this.turnosService.getTurnos().subscribe({
      next: data => { this.turnos = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar turnos'; this.loading = false; }
    });
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

  eliminarTurno(id: number) {
    if (confirm('¿Seguro que desea eliminar este turno?')) {
      this.turnosService.deleteTurno(id).subscribe({
        next: () => this.turnos = this.turnos.filter(t => t.id !== id),
        error: () => alert('Error al eliminar turno')
      });
    }
  }
}
