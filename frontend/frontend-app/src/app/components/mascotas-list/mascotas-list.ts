// frontend-app/src/app/components/mascotas-list/mascotas-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MascotasService, Mascota } from '../../services/mascotas';
import { ClientesService, Cliente } from '../../services/clientes';

@Component({
  selector: 'app-mascotas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mascotas-list.html',
  styleUrls: ['../../styles/lists.css']
})
export class MascotasList implements OnInit {
  mascotas: Mascota[] = [];
  clientes: Cliente[] = [];
  loading = false;
  error = '';

  constructor(
    private mascotasService: MascotasService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.fetchMascotas();
    this.fetchClientes();
  }

  fetchMascotas(): void {
    this.loading = true;
    this.mascotasService.getMascotas().subscribe({
      next: data => { this.mascotas = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar mascotas'; this.loading = false; }
    });
  }

  fetchClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: data => this.clientes = data,
      error: () => console.warn('No se pudieron cargar clientes')
    });
  }

  getClienteNombre(id: number): string {
    const cliente = this.clientes.find(c => c.id === id);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
  }

  eliminarMascota(id: number) {
    if (confirm('¿Seguro que desea eliminar esta mascota?')) {
      this.mascotasService.deleteMascota(id).subscribe({
        next: () => this.mascotas = this.mascotas.filter(m => m.id !== id),
        error: () => alert('Error al eliminar mascota')
      });
    }
  }
}
