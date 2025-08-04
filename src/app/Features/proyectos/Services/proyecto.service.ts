import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../Config/api.config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProyectoService {
  constructor(private http: HttpClient) { }

  getProyecto(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.ProyectoUrl}`);
  }

  CreateProyecto(proyecto: any): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.ProyectoUrl}`, proyecto);
  }

  UpdateProyecto(id: number, proyecto: any): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.ProyectoUrl}/${id}`, proyecto);
  }

  DeleteProyecto(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.ProyectoUrl}/${id}`);
  }


}