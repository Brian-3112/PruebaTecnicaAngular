import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TareaService } from '../../Features/tareas/Services/tareas.service';
import { ModalFormularioTareas } from '../../Components/modal-formulario-tareas/modal-formulario-tareas';
import { AlertService } from '../../shared/Services/alert.service';

interface Tarea {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, NgForOf, TableModule, ButtonModule, ModalFormularioTareas],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {

  idProyecto: number = 0;
  tareas: Tarea[] = [];
  tareaActual: Tarea = { id: 0, title: '', completed: false, userId: 0 };
  modalVisible: boolean = false;
  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idProyecto = id ? Number(id) : 0;

      this.tareaService.getTarea().subscribe((data: Tarea[]) => {
        this.tareas = data.filter(t => t.userId === this.idProyecto);
      });
    });
  }

  Regresar() {
    this.router.navigate(['/proyectos']);
  }

  EliminarTarea(id?: number) {
    if (id !== undefined) {
      this.alertService.alertConfirm('¿Estás seguro de eliminar esta Tarea?').then((confirmed) => {
        if (confirmed) {
          this.tareaService.DeleteTarea(id).subscribe({
            next: () => {
              this.tareas = this.tareas.filter(t => t.id !== id);
              this.alertService.alertSucces('¡Tarea eliminada correctamente!');
            },
            error: () => {
              this.alertService.alertError('Error al eliminar la tarea');
            }
          });
        }
      });
    }
  }

  abrirCrearTarea() {
    this.modoEdicion = false;
    this.tareaActual = { id: 0, title: '', completed: false, userId: this.idProyecto };
    this.modalVisible = true;
  }

  abrirEditarTarea(tarea: Tarea) {
    this.modoEdicion = true;
    this.tareaActual = { ...tarea };
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.modoEdicion = false;
  }

  guardarTarea(tarea: Tarea) {
    if (this.modoEdicion) {
      const index = this.tareas.findIndex(t => t.id === this.tareaActual.id);
      if (index !== -1) {
        this.tareas[index] = {
          ...this.tareaActual,
          ...tarea
        };
      }
      this.modalVisible = false;
      this.modoEdicion = false;
      return;
    }

    const nuevaTarea: Tarea = {
      ...tarea,
      id: 0,
      userId: this.idProyecto
    };

    this.tareaService.CreateTarea(nuevaTarea).subscribe((creada: Tarea) => {
      this.tareas.push(creada);
      this.modalVisible = false;
    });
  }

}
