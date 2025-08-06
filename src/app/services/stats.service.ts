import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getStatistiquesGenerales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/generales`);
  }

  getStatistiquesUtilisateur(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/utilisateur/${userId}`);
  }
}
