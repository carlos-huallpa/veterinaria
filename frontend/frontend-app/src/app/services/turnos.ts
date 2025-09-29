// frontend-app/src/app/services/turnos.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Turno {
  id?: number;
  mascota: number;  // FK a Mascota
  medico: number;   // FK a Medico
  fecha: string;
  hora: string;
  motivo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiUrl = `${environment.apiUrl}/turnos/`;

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  getTurno(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}${id}/`);
  }

  createTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  updateTurno(id: number, turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}${id}/`, turno);
  }

  deleteTurno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

