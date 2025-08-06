import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {Notification} from "../models/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Notification> {
  constructor(http: HttpClient) {
    super(http, 'notifications');
  }

  findByDestinataireId(destinataireId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/destinataire/${destinataireId}`);
  }

  findUnreadNotifications(destinataireId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/destinataire/${destinataireId}/non-lues`);
  }

  countUnreadNotifications(destinataireId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/destinataire/${destinataireId}/count-non-lues`);
  }

  marquerCommeLu(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/marquer-lu`, {});
  }
}

