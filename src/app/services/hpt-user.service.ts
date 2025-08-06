import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HptApiService } from './hpt-api.service';
import {HptCreateUserRequest, HptUser} from "../models/HptUser";

@Injectable({
  providedIn: 'root'
})
export class HptUserService {

  constructor(
    private http: HttpClient,
    private hptApiService: HptApiService
  ) {}

  getAllUsers(): Observable<HptUser[]> {
    return this.http.get<HptUser[]>(this.hptApiService.getApiUrl('users'));
  }

  getUserById(id: number): Observable<HptUser> {
    return this.http.get<HptUser>(this.hptApiService.getApiUrl(`users/${id}`));
  }

  getUserByEmail(email: string): Observable<HptUser> {
    return this.http.get<HptUser>(this.hptApiService.getApiUrl(`users/email/${email}`));
  }

  createUser(user: HptCreateUserRequest): Observable<HptUser> {
    return this.http.post<HptUser>(this.hptApiService.getApiUrl('users'), user);
  }

  updateUser(id: number, user: Partial<HptUser>): Observable<HptUser> {
    return this.http.put<HptUser>(this.hptApiService.getApiUrl(`users/${id}`), user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.hptApiService.getApiUrl(`users/${id}`));
  }
}
