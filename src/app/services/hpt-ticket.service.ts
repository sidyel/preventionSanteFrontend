import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HptApiService } from './hpt-api.service';
import {HptTicket} from "../models/HptTicket";
import {HptCreateTicketRequest} from "../models/HptCreateTicketRequest";
import {HptTicketStatus} from "../models/HptTicketStatus";

@Injectable({
  providedIn: 'root'
})
export class HptTicketService {

  constructor(
    private http: HttpClient,
    private hptApiService: HptApiService
  ) {}

  getAllTickets(): Observable<HptTicket[]> {
    return this.http.get<HptTicket[]>(this.hptApiService.getApiUrl('tickets'));
  }

  getTicketById(id: number): Observable<HptTicket> {
    return this.http.get<HptTicket>(this.hptApiService.getApiUrl(`tickets/${id}`));
  }

  getTicketsByUser(userId: number): Observable<HptTicket[]> {
    return this.http.get<HptTicket[]>(this.hptApiService.getApiUrl(`tickets/user/${userId}`));
  }

  getTicketByNumber(ticketNumber: string): Observable<HptTicket> {
    return this.http.get<HptTicket>(this.hptApiService.getApiUrl(`tickets/number/${ticketNumber}`));
  }

  createTicket(request: HptCreateTicketRequest): Observable<HptTicket> {
    return this.http.post<HptTicket>(this.hptApiService.getApiUrl('tickets'), request);
  }

  updateTicketStatus(id: number, status: HptTicketStatus): Observable<HptTicket> {
    return this.http.put<HptTicket>(
      this.hptApiService.getApiUrl(`tickets/${id}/status?status=${status}`),
      {}
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(this.hptApiService.getApiUrl(`tickets/${id}`));
  }
}
