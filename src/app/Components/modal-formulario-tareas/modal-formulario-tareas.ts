import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-formulario-tareas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-formulario-tareas.html',
  styleUrl: './modal-formulario-tareas.css'
})
export class ModalFormularioTareas implements OnInit {

  @Input() visible: boolean = false;
  @Input() titulo: string = 'Nueva Tarea';
  @Input() tarea: any = {};
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardarModal = new EventEmitter<any>();

  form!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.tarea?.title || '', Validators.required],
      completed: [this.tarea?.completed ?? false, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tarea'] && this.form) {
      this.form.patchValue({
        title: this.tarea?.title || '',
        completed: this.tarea?.completed ?? false
      });
    }
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  guardar() {
    if (this.form.valid) {
      this.guardarModal.emit(this.form.value);
    }
  }

}
