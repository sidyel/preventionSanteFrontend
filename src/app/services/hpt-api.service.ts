import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HptApiService {
  private readonly API_BASE_URL = 'https://preventionsantebackend.onrender.com/api';

  getApiUrl(endpoint: string): string {
    return `${this.API_BASE_URL}/${endpoint}`;
  }
}
