// frontend-app/src/app/services/medicos.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Medico {
  id?: number;
  nombre: string;
  apellido: string;
  matricula: string;
  especialidad: string;
  telefono?: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private apiUrl = `${environment.apiUrl}/medicos/`;

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}${id}/`);
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}${id}/`, medico);
  }

  deleteMedico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

