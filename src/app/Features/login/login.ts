import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Features/login/Services/auth.service';
import { AlertService } from '../../shared/Services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, private alerta: AlertService) { }

  login() {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/proyectos']);
      this.alerta.alertSucces('Bienvenido!')
    } else {
      this.alerta.alertError('Credenciales Inválidas');
    }
  }

  Registro() {
    this.router.navigate(['/registro']);
  }

}
