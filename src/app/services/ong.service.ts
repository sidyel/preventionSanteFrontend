import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {Ong} from "../models/Ong";
import {DomaineIntervention} from "../models/enum";

@Injectable({
  providedIn: 'root'
})
export class OngService extends BaseService<Ong> {
  constructor(http: HttpClient) {
    super(http, 'ongs');
  }

  findByUserId(userId: number): Observable<Ong> {
    return this.http.get<Ong>(`${this.apiUrl}/user/${userId}`);
  }

  findByDomaineIntervention(domaine: DomaineIntervention): Observable<Ong[]> {
    return this.http.get<Ong[]>(`${this.apiUrl}/domaine/${domaine}`);
  }

  findByRegion(region: string): Observable<Ong[]> {
    return this.http.get<Ong[]>(`${this.apiUrl}/region/${region}`);
  }

  searchByNom(nom: string): Observable<Ong[]> {
    return this.http.get<Ong[]>(`${this.apiUrl}/search/${nom}`);
  }

  findByZoneIntervention(zone: string): Observable<Ong[]> {
    return this.http.get<Ong[]>(`${this.apiUrl}/zone/${zone}`);
  }
}

