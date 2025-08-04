import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/Services/auth.service';
import { AlertService } from '../../shared/Services/alert.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private alerta: AlertService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alerta.alertError('Formulario inválido. Revisa los campos.');
      return;
    }

    const { username, password } = this.form.value;
    const success = this.auth.Registrarse(username, password);

    if (success) {
      this.alerta.alertSucces('Usuario registrado');
      this.router.navigate(['/login']);
    } else {
      this.alerta.alertError('El usuario ya existe');
    }
  }





}
