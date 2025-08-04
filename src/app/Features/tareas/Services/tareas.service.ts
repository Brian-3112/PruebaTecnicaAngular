import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../Config/api.config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TareaService {
  constructor(private http: HttpClient) { }


  getTarea(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.TareasUrl}`);

  }

  CreateTarea(tarea: any): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.TareasUrl}`, tarea);
  }

  UpdateTarea(id: number, tarea: any): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.TareasUrl}/${id}`, tarea);
  }

  DeleteTarea(id: number) {
    return this.http.delete<any[]>(`${API_CONFIG.TareasUrl}/${id}`);
  }





}