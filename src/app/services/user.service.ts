import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {User} from "../models/User";
import {TypeActeur} from "../models/enum";


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  findByTypeActeur(typeActeur: TypeActeur): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/type/${typeActeur}`);
  }

  findByRegion(region: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/region/${region}`);
  }

  findByCommune(commune: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/commune/${commune}`);
  }

  findByVillage(village: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/village/${village}`);
  }

  findActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/actifs`);
  }

  deactivateUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/desactiver`, {});
  }

  activateUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/activer`, {});
  }
}

