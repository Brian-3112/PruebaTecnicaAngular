import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users: { username: string; password: string }[] = [];


  login(username: string, password: string): boolean {
    if (!username || !password) return false;

    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('token', 'autenticación');
      return true;
    }
    return false;
  }

  Registrarse(username: string, password: string): boolean {
    const exists = this.users.find(u => u.username === username);
    if (exists) return false; 

    this.users.push({ username, password });
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  LoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}