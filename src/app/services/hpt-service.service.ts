import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HptApiService } from './hpt-api.service';
import {HptService} from "../models/HptService";

@Injectable({
  providedIn: 'root'
})
export class HptServiceService {

  constructor(
    private http: HttpClient,
    private hptApiService: HptApiService
  ) {}

  getAllServices(): Observable<HptService[]> {
    return this.http.get<HptService[]>(this.hptApiService.getApiUrl('services'));
  }

  getServiceById(id: number): Observable<HptService> {
    return this.http.get<HptService>(this.hptApiService.getApiUrl(`services/${id}`));
  }

  getServicesByHospital(hospitalId: number): Observable<HptService[]> {
    return this.http.get<HptService[]>(this.hptApiService.getApiUrl(`services/hospital/${hospitalId}`));
  }

  getServicesByCategory(category: string): Observable<HptService[]> {
    return this.http.get<HptService[]>(this.hptApiService.getApiUrl(`services/category/${category}`));
  }

  searchServices(name: string): Observable<HptService[]> {
    return this.http.get<HptService[]>(this.hptApiService.getApiUrl(`services/search?name=${name}`));
  }
}
