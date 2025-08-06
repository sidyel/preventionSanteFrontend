import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HptHospital} from "../../../models/HptHospital";
import {HptHospitalService} from "../../../services/hpt-hospital.service";


@Component({
  selector: 'app-hpt-hospital-list',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-hpt-header></app-hpt-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Nos hôpitaux partenaires</h1>

          <!-- Barre de recherche -->
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="flex-1">
              <input type="text"
                     [(ngModel)]="searchTerm"
                     (input)="onSearch()"
                     placeholder="Rechercher par nom d'hôpital..."
                     class="hpt-input">
            </div>
            <div class="flex-1">
              <input type="text"
                     [(ngModel)]="addressSearch"
                     (input)="onSearch()"
                     placeholder="Rechercher par adresse..."
                     class="hpt-input">
            </div>
            <button (click)="clearSearch()"
                    class="hpt-btn hpt-btn-secondary px-6">
              Effacer
            </button>
          </div>
        </div>

        <!-- Loading -->
        <app-hpt-loading *ngIf="isLoading" message="Chargement des hôpitaux..."></app-hpt-loading>

        <!-- Liste des hôpitaux -->
        <div *ngIf="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let hospital of hospitals"
               class="hpt-card hover:shadow-lg transition-shadow cursor-pointer"
               (click)="viewHospitalDetails(hospital.id)">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">{{ hospital.name }}</h3>
              <span class="text-2xl">🏥</span>
            </div>

            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex items-center">
                <span class="mr-2">📍</span>
                {{ hospital.address }}
              </div>
              <div class="flex items-center">
                <span class="mr-2">📞</span>
                {{ hospital.phone }}
              </div>
              <div class="flex items-center">
                <span class="mr-2">✉️</span>
                {{ hospital.email }}
              </div>
            </div>

            <p *ngIf="hospital.description" class="text-gray-700 text-sm mb-4">
              {{ hospital.description }}
            </p>

            <div class="flex justify-between items-center">
              <button (click)="viewServices(hospital.id); $event.stopPropagation()"
                      class="text-hpt-primary hover:text-blue-700 font-medium text-sm">
                Voir les services
              </button>
              <span class="text-xs text-gray-500">
                {{ getServicesCount(hospital) }} services
              </span>
            </div>
          </div>
        </div>

        <!-- Message si aucun résultat -->
        <div *ngIf="!isLoading && hospitals.length === 0"
             class="text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun hôpital trouvé</h3>
          <p class="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      </div>
    </div>
  `
})
export class HptHospitalListComponent implements OnInit {
  hospitals: HptHospital[] = [];
  isLoading = false;
  searchTerm = '';
  addressSearch = '';

  constructor(
    private hptHospitalService: HptHospitalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals(): void {
    this.isLoading = true;
    this.hptHospitalService.getAllHospitals().subscribe({
      next: (hospitals) => {
        this.hospitals = hospitals;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des hôpitaux:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm && !this.addressSearch) {
      this.loadHospitals();
      return;
    }

    this.isLoading = true;
    const searchParams: any = {};
    if (this.searchTerm) searchParams.name = this.searchTerm;
    if (this.addressSearch) searchParams.address = this.addressSearch;

    this.hptHospitalService.searchHospitals(searchParams).subscribe({
      next: (hospitals) => {
        this.hospitals = hospitals;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche:', error);
        this.isLoading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.addressSearch = '';
    this.loadHospitals();
  }

  viewHospitalDetails(hospitalId: number): void {
    this.router.navigate(['/hospitals', hospitalId]);
  }

  viewServices(hospitalId: number): void {
    this.router.navigate(['/hospitals', hospitalId, 'services']);
  }

  getServicesCount(hospital: HptHospital): number {
    return hospital.services?.length || 0;
  }
}
