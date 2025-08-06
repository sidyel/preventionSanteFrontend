import { Component, OnInit } from '@angular/core';
import {HptHospitalService} from "../../services/hpt-hospital.service";
import {HptServiceService} from "../../services/hpt-service.service";
import {HptTicketService} from "../../services/hpt-ticket.service";


@Component({
  selector: 'app-hpt-dashboard',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-hpt-header></app-hpt-header>

      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-hpt-primary to-blue-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Trouvez vos soins médicaux facilement
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
              Réservez vos examens et consultations en quelques clics
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button (click)="navigateToHospitals()"
                      class="bg-white text-hpt-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                🏥 Voir les hôpitaux
              </button>
              <button (click)="navigateToServices()"
                      class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-hpt-primary transition-colors">
                🔍 Rechercher un service
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-hpt-primary mb-2">{{ statsData.hospitalsCount }}</div>
              <div class="text-gray-600">Hôpitaux partenaires</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-hpt-primary mb-2">{{ statsData.servicesCount }}</div>
              <div class="text-gray-600">Services disponibles</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-hpt-primary mb-2">{{ statsData.ticketsCount }}</div>
              <div class="text-gray-600">Tickets créés</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services populaires -->
      <div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center mb-12">Services les plus demandés</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let category of popularServices" class="hpt-card text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div class="text-4xl mb-4">{{ category.icon }}</div>
              <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 text-sm">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HptDashboardComponent implements OnInit {
  statsData = {
    hospitalsCount: 0,
    servicesCount: 0,
    ticketsCount: 0
  };

  popularServices = [
    {
      name: 'Scanner',
      icon: '🔍',
      description: 'Imagerie médicale de haute qualité'
    },
    {
      name: 'Radio',
      icon: '📡',
      description: 'Radiographie rapide et précise'
    },
    {
      name: 'Consultation',
      icon: '👨‍⚕️',
      description: 'Consultations spécialisées'
    },
    {
      name: 'Urgences',
      icon: '🚨',
      description: 'Prise en charge d\'urgence 24h/24'
    }
  ];

  constructor(
    private hptHospitalService: HptHospitalService,
    private hptServiceService: HptServiceService,
    private hptTicketService: HptTicketService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.hptHospitalService.getAllHospitals().subscribe(hospitals => {
      this.statsData.hospitalsCount = hospitals.length;
    });

    this.hptServiceService.getAllServices().subscribe(services => {
      this.statsData.servicesCount = services.length;
    });

    this.hptTicketService.getAllTickets().subscribe(tickets => {
      this.statsData.ticketsCount = tickets.length;
    });
  }

  navigateToHospitals(): void {
    // Navigation logic
  }

  navigateToServices(): void {
    // Navigation logic
  }
}
