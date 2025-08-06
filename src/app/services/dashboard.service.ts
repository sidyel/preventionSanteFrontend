import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {DashboardData} from "../models/DashboardData";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboardOng(userId: number): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/ong/${userId}`);
  }

  getDashboardStructureSante(userId: number): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/structure-sante/${userId}`);
  }

  getDashboardPopulation(userId: number): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/population/${userId}`);
  }
}
