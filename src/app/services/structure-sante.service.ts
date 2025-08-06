import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {StructureSante} from "../models/StructureSante";
import {TypeStructure} from "../models/enum";


@Injectable({
  providedIn: 'root'
})
export class StructureSanteService extends BaseService<StructureSante> {
  constructor(http: HttpClient) {
    super(http, 'structures-sante');
  }

  findByUserId(userId: number): Observable<StructureSante> {
    return this.http.get<StructureSante>(`${this.apiUrl}/user/${userId}`);
  }

  findByTypeStructure(typeStructure: TypeStructure): Observable<StructureSante[]> {
    return this.http.get<StructureSante[]>(`${this.apiUrl}/type/${typeStructure}`);
  }

  findByRegion(region: string): Observable<StructureSante[]> {
    return this.http.get<StructureSante[]>(`${this.apiUrl}/region/${region}`);
  }

  searchByNom(nom: string): Observable<StructureSante[]> {
    return this.http.get<StructureSante[]>(`${this.apiUrl}/search/${nom}`);
  }
}
