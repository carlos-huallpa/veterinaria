// frontend-app/src/app/components/clientes-form/clientes-form.ts
import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from '../../services/clientes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.html',
  styleUrls: ['../../styles/forms.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class ClientesForm implements OnInit {
  clienteForm!: FormGroup;
  clienteId?: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      telefono: ['']
    });

    if (this.clienteId) {
      this.loading = true;
      this.clientesService.getCliente(this.clienteId).subscribe({
        next: (data) => {
          this.clienteForm.patchValue(data);
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar cliente';
          this.loading = false;
        }
      });
    }
  }

  guardarCliente(): void {
    if (this.clienteForm.invalid) return;

    const cliente: Cliente = this.clienteForm.value;

    if (this.clienteId) {
      this.clientesService.updateCliente(this.clienteId, cliente).subscribe({
        next: () => this.router.navigate(['/clientes-list']),
        error: () => this.error = 'Error al actualizar cliente'
      });
    } else {
      this.clientesService.createCliente(cliente).subscribe({
        next: () => this.router.navigate(['/clientes-list']),
        error: () => this.error = 'Error al crear cliente'
      });
    }
  }
}
