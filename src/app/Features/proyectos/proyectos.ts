import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../Features/login/Services/auth.service';
import { CommonModule, NgForOf } from '@angular/common';
import { ProyectoService } from '../../Features/proyectos/Services/proyecto.service';
import { TareaService } from '../../Features/tareas/Services/tareas.service';
import { ModalFormulario } from '../../Components/modal-formulario/modal-formulario';
import { Proyecto } from '../../Features/proyectos/Models/proyecto.model';
import { AlertService } from '../../shared/Services/alert.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, NgForOf, CardModule, ButtonModule, ModalFormulario],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class Proyectos implements OnInit {

  proyectos: Proyecto[] = [];
  tareas: any[] = [];

  constructor(
    private proyectoService: ProyectoService, private auth: AuthService, private router: Router, private tareaService: TareaService, private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.proyectoService.getProyecto().subscribe((proyectos: Proyecto[]) => {
      this.proyectos = proyectos;

      this.tareaService.getTarea().subscribe((tareas: any[]) => {
        this.tareas = tareas;

        this.proyectos = this.proyectos.map(proyecto => ({
          ...proyecto,
          tareas: this.tareas.filter(t => t.userId === proyecto.id)
        }));
      });
    });
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  IrTareas(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['/tareas', id]);
    }
  }

  EliminarProyecto(id?: number) {
    if (id !== undefined) {
      this.alertService.alertConfirm('¿Estás seguro de eliminar este Proyecto?').then((confirmed) => {
        if (confirmed) {
          this.proyectoService.DeleteProyecto(id).subscribe({
            next: () => {
              this.proyectos = this.proyectos.filter(p => p.id !== id);
              this.alertService.alertSucces('¡Proyecto eliminado correctamente!');
            },
            error: () => {
              this.alertService.alertError('Error al eliminar el proyecto');
            }
          });
        }
      });
    }
  }
  modalVisible = false;
  modoEdicion = false;

  proyectoActual: Proyecto = {
    id: 0, name: '', username: '', email: '', address: { city: '' }, tareas: []
  };


  abrirAgregar() {
    this.modoEdicion = false;
    this.proyectoActual = {
      id: 0, name: '', username: '', email: '', address: { city: '' }, tareas: []
    };
    this.modalVisible = true;
  }

  abrirEditar(proyecto: Proyecto) {
    this.modoEdicion = true;
    this.proyectoActual = JSON.parse(JSON.stringify(proyecto));
    this.modalVisible = true;
  }

  guardarProyecto() {
    if (this.modoEdicion) {
      const index = this.proyectos.findIndex(p => p.id === this.proyectoActual.id);
      if (index !== -1) {
        this.proyectos[index] = {
          ...this.proyectoActual,
          tareas: this.proyectos[index].tareas
        };
      }
      this.modalVisible = false;
      return;
    }

    this.proyectoService.CreateProyecto(this.proyectoActual).subscribe((nuevoProyecto: Proyecto) => {
      this.proyectos.push({
        ...nuevoProyecto,
        tareas: []
      });
      this.modalVisible = false;
    });
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
