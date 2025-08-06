import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HptServiceService} from "../../../services/hpt-service.service";
import {HptHospitalService} from "../../../services/hpt-hospital.service";
import {HptHospital} from "../../../models/HptHospital";
import {HptService} from "../../../models/HptService";


@Component({
  selector: 'app-hpt-hospital-detail',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-hpt-header></app-hpt-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <app-hpt-loading *ngIf="isLoading" message="Chargement des détails..."></app-hpt-loading>

        <div *ngIf="!isLoading && hospital">
          <!-- Header avec info hôpital -->
          <div class="hpt-card mb-8">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ hospital.name }}</h1>
                <p *ngIf="hospital.description" class="text-gray-700 mb-4">{{ hospital.description }}</p>
              </div>
              <span class="text-6xl">🏥</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-center space-x-3">
                <span class="text-xl">📍</span>
                <div>
                  <div class="font-semibold">Adresse</div>
                  <div class="text-gray-600">{{ hospital.address }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-xl">📞</span>
                <div>
                  <div class="font-semibold">Téléphone</div>
                  <div class="text-gray-600">{{ hospital.phone }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-xl">✉️</span>
                <div>
                  <div class="font-semibold">Email</div>
                  <div class="text-gray-600">{{ hospital.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Services disponibles -->
          <div class="hpt-card">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Services disponibles</h2>

            <div *ngIf="services.length === 0" class="text-center py-8">
              <div class="text-4xl mb-4">🔍</div>
              <p class="text-gray-600">Aucun service disponible pour cet hôpital</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let service of services"
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {{ service.category }}
                  </span>
                </div>

                <p *ngIf="service.description" class="text-gray-600 text-sm mb-4">
                  {{ service.description }}
                </p>

                <!-- Tarifs -->
                <div *ngIf="service.tarifs && service.tarifs.length > 0" class="space-y-2">
                  <h4 class="font-medium text-gray-900 text-sm">Tarifs:</h4>
                  <div class="space-y-1">
                    <div *ngFor="let tarif of service.tarifs"
                         class="flex justify-between items-center text-sm">
                      <span class="text-gray-700">{{ tarif.procedureName }}</span>
                      <span class="font-semibold text-hpt-primary">{{ tarif.price | currency:'XOF':'symbol':'1.0-0' }}</span>
                    </div>
                  </div>
                </div>

                <button (click)="selectService(service)"
                        class="w-full mt-4 hpt-btn hpt-btn-primary text-sm">
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HptHospitalDetailComponent implements OnInit {
  hospital: HptHospital | null = null;
  services: HptService[] = [];
  isLoading = false;
  hospitalId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hptHospitalService: HptHospitalService,
    private hptServiceService: HptServiceService
  ) {}

  ngOnInit(): void {
    this.hospitalId = +this.route.snapshot.paramMap.get('id')!;
    this.loadHospitalDetails();
    this.loadServices();
  }

  loadHospitalDetails(): void {
    this.isLoading = true;
    this.hptHospitalService.getHospitalById(this.hospitalId).subscribe({
      next: (hospital) => {
        this.hospital = hospital;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'hôpital:', error);
        this.isLoading = false;
      }
    });
  }

  loadServices(): void {
    this.hptServiceService.getServicesByHospital(this.hospitalId).subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des services:', error);
      }
    });
  }

  selectService(service: HptService): void {
    this.router.navigate(['/tickets/create'], {
      queryParams: {
        serviceId: service.id,
        hospitalId: this.hospitalId
      }
    });
  }
}
