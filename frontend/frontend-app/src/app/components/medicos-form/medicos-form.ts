// frontend-app/src/app/components/medicos-form/medicos-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicosService, Medico } from '../../services/medicos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-medicos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './medicos-form.html',
  styleUrls: ['../../styles/forms.css']
})
export class MedicosForm implements OnInit {
  medicoForm!: FormGroup;
  medicoId?: number;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicoId = Number(this.route.snapshot.paramMap.get('id'));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      matricula: ['', Validators.required],
      especialidad: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.medicoId) {
      this.loading = true;
      this.medicosService.getMedico(this.medicoId).subscribe({
        next: data => { this.medicoForm.patchValue(data); this.loading = false; },
        error: () => { this.error = 'Error al cargar médico'; this.loading = false; }
      });
    }
  }

  guardarMedico(): void {
    if (this.medicoForm.invalid) return;
    const medico: Medico = this.medicoForm.value;

    if (this.medicoId) {
      this.medicosService.updateMedico(this.medicoId, medico).subscribe({
        next: () => this.router.navigate(['/medicos-list']),
        error: () => this.error = 'Error al actualizar médico'
      });
    } else {
      this.medicosService.createMedico(medico).subscribe({
        next: () => this.router.navigate(['/medicos-list']),
        error: () => this.error = 'Error al crear médico'
      });
    }
  }
}

