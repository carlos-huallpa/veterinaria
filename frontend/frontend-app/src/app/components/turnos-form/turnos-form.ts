// frontend-app/src/app/components/turnos-form/turnos-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnosService, Turno } from '../../services/turnos';
import { MascotasService, Mascota } from '../../services/mascotas';
import { MedicosService, Medico } from '../../services/medicos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-turnos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './turnos-form.html',
  styleUrls: ['../../styles/forms.css']
})
export class TurnosForm implements OnInit {
  turnoForm!: FormGroup;
  turnoId?: number;
  mascotas: Mascota[] = [];
  medicos: Medico[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private turnosService: TurnosService,
    private mascotasService: MascotasService,
    private medicosService: MedicosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.turnoId = Number(this.route.snapshot.paramMap.get('id'));

    this.turnoForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      mascota: ['', Validators.required],
      medico: ['', Validators.required],
      motivo: ['', Validators.required]
    });

    this.mascotasService.getMascotas().subscribe({ next: data => this.mascotas = data });
    this.medicosService.getMedicos().subscribe({ next: data => this.medicos = data });

    if (this.turnoId) {
      this.loading = true;
      this.turnosService.getTurno(this.turnoId).subscribe({
        next: data => { this.turnoForm.patchValue(data); this.loading = false; },
        error: () => { this.error = 'Error al cargar turno'; this.loading = false; }
      });
    }
  }

  guardarTurno(): void {
    if (this.turnoForm.invalid) return;

    const turno: Turno = this.turnoForm.value;

    if (this.turnoId) {
      this.turnosService.updateTurno(this.turnoId, turno).subscribe({
        next: () => this.router.navigate(['/turnos-list']),
        error: err => this.error = 'Error al actualizar turno: ' + (err.error?.detalle || '')
      });
    } else {
      this.turnosService.createTurno(turno).subscribe({
        next: () => this.router.navigate(['/turnos-list']),
        error: err => this.error = 'Error al crear turno: ' + (err.error?.detalle || '')
      });
    }
  }
}
