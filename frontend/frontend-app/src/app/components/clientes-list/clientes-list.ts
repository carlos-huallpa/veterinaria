// frontend-app/src/app/components/clientes/clientes-list.ts
import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from '../../services/clientes';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.html',  // Archivo HTML asociado
  styleUrls: ['./clientes-list.css'],    // Archivo CSS asociado
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,],
})
export class ClientesList implements OnInit {
  clientes: Cliente[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.fetchClientes();
  }

  fetchClientes(): void {
    this.loading = true;
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar clientes';
        this.loading = false;
      }
    });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Seguro que desea eliminar este cliente?')) {
      this.clientesService.deleteCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id !== id);
        },
        error: () => {
          alert('Error al eliminar cliente');
        }
      });
    }
  }
}

