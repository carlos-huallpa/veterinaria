// frontend-app/src/app/services/clientes.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = `${environment.apiUrl}/clientes/`;

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}${id}/`);
  }

  // Crear un nuevo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Actualizar un cliente existente
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}${id}/`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

