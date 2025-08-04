import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-formulario.html',
  styleUrl: './modal-formulario.css'
})
export class ModalFormulario {

  @Input() visible = false;
  @Input() titulo = 'Agregar Proyecto';
  @Input() modelo: any = {}; // El objeto editable (por referencia)
  @Output() onGuardar = new EventEmitter<void>();
  @Output() onCerrar = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modelo'] && this.modelo) {
      this.form.patchValue({
        name: this.modelo.name || '',
        username: this.modelo.username || '',
        email: this.modelo.email || '',
        city: this.modelo.address?.city || ''
      });
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    const datos = this.form.value;
    this.modelo.name = datos.name;
    this.modelo.username = datos.username;
    this.modelo.email = datos.email;
    this.modelo.address = { city: datos.city };

    this.onGuardar.emit(this.modelo);
  }

  cerrar() {
    this.onCerrar.emit();
  }


}
