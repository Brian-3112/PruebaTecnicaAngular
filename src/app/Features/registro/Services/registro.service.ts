import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../Config/api.config';


@Injectable({
  providedIn: 'root' 
})


export class RegistroService {
  constructor(private http: HttpClient) {}
  
}