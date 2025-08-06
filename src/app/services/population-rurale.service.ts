import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {PopulationRurale} from "../models/PopulationRurale";
import {Sexe} from "../models/enum";

@Injectable({
  providedIn: 'root'
})
export class PopulationRuraleService extends BaseService<PopulationRurale> {
  constructor(http: HttpClient) {
    super(http, 'population-rurale');
  }

  findByUserId(userId: number): Observable<PopulationRurale> {
    return this.http.get<PopulationRurale>(`${this.apiUrl}/user/${userId}`);
  }

  findByRegion(region: string): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/region/${region}`);
  }

  findByCommune(commune: string): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/commune/${commune}`);
  }

  findByVillage(village: string): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/village/${village}`);
  }

  findBySexe(sexe: Sexe): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/sexe/${sexe}`);
  }

  findByLangue(langue: string): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/langue/${langue}`);
  }

  findByAlphabetise(alphabetise: boolean): Observable<PopulationRurale[]> {
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/alphabetise/${alphabetise}`);
  }

  findByAge(ageMin: number, ageMax: number): Observable<PopulationRurale[]> {
    const params = new HttpParams()
      .set('ageMin', ageMin.toString())
      .set('ageMax', ageMax.toString());
    return this.http.get<PopulationRurale[]>(`${this.apiUrl}/age`, { params });
  }
}
