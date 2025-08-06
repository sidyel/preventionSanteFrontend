import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {Message} from "../models/Message";
import {PrioriteMessage, TypeMessage} from "../models/enum";


@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService<Message> {
  constructor(http: HttpClient) {
    super(http, 'messages');
  }

  findByExpediteurId(expediteurId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/expediteur/${expediteurId}`);
  }

  findByDestinataireId(destinataireId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/destinataire/${destinataireId}`);
  }

  findUnreadByDestinataireId(destinataireId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/destinataire/${destinataireId}/non-lus`);
  }

  findByCampagneId(campagneId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/campagne/${campagneId}`);
  }

  findByType(typeMessage: TypeMessage): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/type/${typeMessage}`);
  }

  findByPriorite(priorite: PrioriteMessage): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/priorite/${priorite}`);
  }

  envoyerMessage(id: number, destinataireIds: number[]): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${id}/envoyer`, destinataireIds);
  }

  marquerCommeLu(messageId: number, destinataireId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${messageId}/marquer-lu/${destinataireId}`, {});
  }

  countUnreadMessages(destinataireId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/destinataire/${destinataireId}/count-non-lus`);
  }
}
