import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HptApiService {
  private readonly API_BASE_URL = 'http://localhost:8082/api';

  getApiUrl(endpoint: string): string {
    return `${this.API_BASE_URL}/${endpoint}`;
  }
}
