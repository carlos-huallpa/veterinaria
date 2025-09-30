// frontend-app/src/app/components/medicos-list/medicos-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicosService, Medico } from '../../services/medicos';

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicos-list.html',
  styleUrls: ['../../styles/lists.css']
})
export class MedicosList implements OnInit {
  medicos: Medico[] = [];
  loading = false;
  error = '';

  constructor(private medicosService: MedicosService) {}

  ngOnInit(): void {
    this.fetchMedicos();
  }

  fetchMedicos(): void {
    this.loading = true;
    this.medicosService.getMedicos().subscribe({
      next: data => { this.medicos = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar médicos'; this.loading = false; }
    });
  }

  eliminarMedico(id: number) {
    if (confirm('¿Seguro que desea eliminar este médico?')) {
      this.medicosService.deleteMedico(id).subscribe({
        next: () => this.medicos = this.medicos.filter(m => m.id !== id),
        error: () => alert('Error al eliminar médico')
      });
    }
  }
}

