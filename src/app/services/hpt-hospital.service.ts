import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HptApiService } from './hpt-api.service';
import {HptHospital} from "../models/HptHospital";

@Injectable({
  providedIn: 'root'
})
export class HptHospitalService {

  constructor(
    private http: HttpClient,
    private hptApiService: HptApiService
  ) {}

  getAllHospitals(): Observable<HptHospital[]> {
    return this.http.get<HptHospital[]>(this.hptApiService.getApiUrl('hospitals'));
  }

  getHospitalById(id: number): Observable<HptHospital> {
    return this.http.get<HptHospital>(this.hptApiService.getApiUrl(`hospitals/${id}`));
  }

  getHospitalWithServices(id: number): Observable<HptHospital> {
    return this.http.get<HptHospital>(this.hptApiService.getApiUrl(`hospitals/${id}/with-services`));
  }

  searchHospitals(params: { name?: string; address?: string }): Observable<HptHospital[]> {
    let queryParams = '';
    if (params.name) queryParams += `name=${params.name}&`;
    if (params.address) queryParams += `address=${params.address}&`;

    return this.http.get<HptHospital[]>(
      this.hptApiService.getApiUrl(`hospitals/search?${queryParams}`)
    );
  }

  createHospital(hospital: Partial<HptHospital>): Observable<HptHospital> {
    return this.http.post<HptHospital>(this.hptApiService.getApiUrl('hospitals'), hospital);
  }

  updateHospital(id: number, hospital: Partial<HptHospital>): Observable<HptHospital> {
    return this.http.put<HptHospital>(this.hptApiService.getApiUrl(`hospitals/${id}`), hospital);
  }

  deleteHospital(id: number): Observable<void> {
    return this.http.delete<void>(this.hptApiService.getApiUrl(`hospitals/${id}`));
  }
}
