// frontend-app/src/app/services/mascotas.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento?: string;
  cliente: number;  // FK al Cliente
}

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private apiUrl = `${environment.apiUrl}/mascotas/`;

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}${id}/`);
  }

  createMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, mascota);
  }

  updateMascota(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}${id}/`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
