import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {Alerte} from "../models/Alerte";
import {NiveauUrgence, TypeAlerte} from "../models/enum";


@Injectable({
  providedIn: 'root'
})
export class AlerteService extends BaseService<Alerte> {
  constructor(http: HttpClient) {
    super(http, 'alertes');
  }

  findByExpediteurId(expediteurId: number): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/expediteur/${expediteurId}`);
  }

  findByDestinataireId(destinataireId: number): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/destinataire/${destinataireId}`);
  }

  findUnreadByDestinataireId(destinataireId: number): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/destinataire/${destinataireId}/non-lues`);
  }

  findActiveAlertes(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/actives`);
  }

  findByType(typeAlerte: TypeAlerte): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/type/${typeAlerte}`);
  }

  findByUrgence(niveauUrgence: NiveauUrgence): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/urgence/${niveauUrgence}`);
  }

  findByZone(zone: string): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}/zone/${zone}`);
  }

  diffuserAlerte(id: number, destinataireIds: number[]): Observable<Alerte> {
    return this.http.post<Alerte>(`${this.apiUrl}/${id}/diffuser`, destinataireIds);
  }

  marquerCommeLu(alerteId: number, destinataireId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${alerteId}/marquer-lu/${destinataireId}`, {});
  }

  accuserReception(alerteId: number, destinataireId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${alerteId}/accuser-reception/${destinataireId}`, {});
  }

  desactiverAlerte(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/desactiver`, {});
  }

  countUnreadAlertes(destinataireId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/destinataire/${destinataireId}/count-non-lues`);
  }

  countAccusedReceptions(alerteId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${alerteId}/count-accuses`);
  }
}
