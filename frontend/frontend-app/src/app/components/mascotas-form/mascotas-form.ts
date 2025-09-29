// frontend-app/src/app/components/mascotas-form/mascotas-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotasService, Mascota } from '../../services/mascotas';
import { ClientesService, Cliente } from '../../services/clientes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mascotas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mascotas-form.html',
  styleUrls: ['./mascotas-form.css']
})
export class MascotasForm implements OnInit {
  mascotaForm!: FormGroup;
  mascotaId?: number;
  clientes: Cliente[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService,
    private clientesService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fecha_nacimiento: [''],
      cliente: ['', Validators.required]
    });

    this.clientesService.getClientes().subscribe({
      next: data => this.clientes = data,
      error: () => console.warn('Error cargando clientes')
    });

    if (this.mascotaId) {
      this.loading = true;
      this.mascotasService.getMascota(this.mascotaId).subscribe({
        next: data => { this.mascotaForm.patchValue(data); this.loading = false; },
        error: () => { this.error = 'Error al cargar mascota'; this.loading = false; }
      });
    }
  }

  guardarMascota(): void {
    if (this.mascotaForm.invalid) return;
    const mascota: Mascota = this.mascotaForm.value;

    if (this.mascotaId) {
      this.mascotasService.updateMascota(this.mascotaId, mascota).subscribe({
        next: () => this.router.navigate(['/mascotas-list']),
        error: () => this.error = 'Error al actualizar mascota'
      });
    } else {
      this.mascotasService.createMascota(mascota).subscribe({
        next: () => this.router.navigate(['/mascotas-list']),
        error: () => this.error = 'Error al crear mascota'
      });
    }
  }
}
