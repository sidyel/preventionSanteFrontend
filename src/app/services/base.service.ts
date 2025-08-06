import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {environmentProd} from "../../environments/environment.prod";

export abstract class BaseService<T> {
  protected apiUrl: string;

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.apiUrl = `${environmentProd.apiUrl}/${endpoint}`;
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity);
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
