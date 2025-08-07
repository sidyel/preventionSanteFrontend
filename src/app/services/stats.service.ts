import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environmentProd} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = `${environmentProd.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getStatistiquesGenerales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/generales`);
  }

  getStatistiquesUtilisateur(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/utilisateur/${userId}`);
  }
}
