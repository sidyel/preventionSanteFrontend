import { Component, OnInit } from '@angular/core';
import {DashboardData} from "../../../models/DashboardData";
import {DashboardService} from "../../../services/dashboard.service";
import {StatsService} from "../../../services/stats.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData = {};
  loading = true;

  // Données de test - remplacez par les vraies données
  currentUserId = 1;
  userType = 'ONG'; // ONG, STRUCTURE_SANTE, POPULATION_RURALE
  ACTIVE: string="ACTIVE";

  constructor(
    private dashboardService: DashboardService,
    private statsService: StatsService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  getCampagneStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-success-100 text-success-800';
      case 'TERMINEE':
        return 'bg-gray-100 text-gray-800';
      case 'SUSPENDUE':
        return 'bg-warning-100 text-warning-800';
      case 'ANNULEE':
        return 'bg-danger-100 text-danger-800';
      case 'BROUILLON':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  private loadDashboardData() {
    this.loading = true;

    // Chargez les données selon le type d'utilisateur
    let dashboardObservable;

    switch (this.userType) {
      case 'ONG':
        dashboardObservable = this.dashboardService.getDashboardOng(this.currentUserId);
        break;
      case 'STRUCTURE_SANTE':
        dashboardObservable = this.dashboardService.getDashboardStructureSante(this.currentUserId);
        break;
      case 'POPULATION_RURALE':
        dashboardObservable = this.dashboardService.getDashboardPopulation(this.currentUserId);
        break;
      default:
        dashboardObservable = this.dashboardService.getDashboardOng(this.currentUserId);
    }

    dashboardObservable.subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du dashboard:', error);
        this.loading = false;
      }
    });
  }
}
