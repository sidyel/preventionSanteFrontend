import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {Campagne} from "../models/Campagne";
import {StatusCampagne, TypeCampagne} from "../models/enum";


@Injectable({
  providedIn: 'root'
})
export class CampagneService extends BaseService<Campagne> {
  constructor(http: HttpClient) {
    super(http, 'campagnes');
  }

  findByStatus(status: StatusCampagne): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/status/${status}`);
  }

  findByType(typeCampagne: TypeCampagne): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/type/${typeCampagne}`);
  }

  findByUserId(userId: number): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/user/${userId}`);
  }

  findRecentByUser(userId: number): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/user/${userId}/recentes`);
  }

  findActiveCampaigns(): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/actives`);
  }

  findByZone(zone: string): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/zone/${zone}`);
  }

  searchByNom(nom: string): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${this.apiUrl}/search/${nom}`);
  }

  updateProgression(id: number, progression: number): Observable<void> {
    const params = new HttpParams().set('progression', progression.toString());
    return this.http.put<void>(`${this.apiUrl}/${id}/progression`, {}, { params });
  }

  updateStatus(id: number, status: StatusCampagne): Observable<void> {
    const params = new HttpParams().set('status', status);
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, {}, { params });
  }
}
