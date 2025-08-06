import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlerteService } from '../../../services/alerte.service';
import { UserService } from '../../../services/user.service';
import {Alerte} from "../../../models/Alerte";
import {User} from "../../../models/User";

@Component({
  selector: 'app-alerte-detail',
  templateUrl: './alerte-detail.component.html',
  styleUrls: ['./alerte-detail.component.css']
})
export class AlerteDetailComponent implements OnInit {
  alerte: Alerte | null = null;
  loading = true;
  alerteId: number;

  // Diffusion functionality
  showDiffusionModal = false;
  destinataires: User[] = [];
  selectedDestinataires: number[] = [];
  diffusingAlerte = false;

  // Stats
  totalDestinataires = 0;
  accusesReception = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerteService: AlerteService,
    private userService: UserService
  ) {
    this.alerteId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadAlerte();
    this.loadDestinataires();
    this.loadStats();
  }

  loadAlerte() {
    this.loading = true;
    this.alerteService.findById(this.alerteId).subscribe({
      next: (alerte) => {
        this.alerte = alerte;
        this.totalDestinataires = alerte.destinataires?.length || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

loadDestinataires() {
  this.userService.findActiveUsers().subscribe({
    next: (users) => {
      this.destinataires = users;
    },
    error: (error) => {
      console.error('Erreur lors du chargement des destinataires:', error);
    }
  });
}

loadStats() {
  this.alerteService.countAccusedReceptions(this.alerteId).subscribe({
    next: (count) => {
      this.accusesReception = count;
    },
    error: (error) => {
      console.error('Erreur lors du chargement de l\'alerte:', error);
      this.loading = false;
      this.router.navigate(['/alertes']);
    }
  });
}

  editAlerte() {
    this.router.navigate(['/alertes', this.alerteId, 'edit']);
  }

  deleteAlerte() {
    if (!this.alerte) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'alerte "${this.alerte.titre}" ?`)) {
      this.alerteService.delete(this.alerteId).subscribe({
        next: () => {
          this.router.navigate(['/alertes']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  desactiverAlerte() {
    if (!this.alerte) return;

    if (confirm(`Êtes-vous sûr de vouloir désactiver l'alerte "${this.alerte.titre}" ?`)) {
      this.alerteService.desactiverAlerte(this.alerteId).subscribe({
        next: () => {
          this.alerte!.active = false;
        },
        error: (error) => {
          console.error('Erreur lors de la désactivation:', error);
        }
      });
    }
  }

  openDiffusionModal() {
    this.showDiffusionModal = true;
    this.selectedDestinataires = [];
  }

  onDestinataireChange(userId: number, event: any) {
    if (event.target.checked) {
      this.selectedDestinataires.push(userId);
    } else {
      this.selectedDestinataires = this.selectedDestinataires.filter(id => id !== userId);
    }
  }

  selectAllDestinataires(event: any) {
    if (event.target.checked) {
      this.selectedDestinataires = this.destinataires
        .map(u => u.id)
        .filter((id): id is number => id !== undefined);
    } else {
      this.selectedDestinataires = [];
    }
  }


  diffuserAlerte() {
    if (this.selectedDestinataires.length === 0) return;

    this.diffusingAlerte = true;
    this.alerteService.diffuserAlerte(this.alerteId, this.selectedDestinataires).subscribe({
      next: (updatedAlerte) => {
        this.alerte = updatedAlerte;
        this.totalDestinataires = updatedAlerte.destinataires?.length || 0;
        this.showDiffusionModal = false;
        this.diffusingAlerte = false;
        this.loadStats(); // Reload stats
      },
      error: (error) => {
        console.error('Erreur lors de la diffusion:', error);
        this.diffusingAlerte = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/alertes']);
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'EPIDEMIE': 'Épidémie',
      'CONTAMINATION_EAU': 'Contamination de l\'eau',
      'ALERTE_SANITAIRE': 'Alerte sanitaire',
      'VACCINATION_URGENTE': 'Vaccination urgente',
      'RUPTURE_MEDICAMENT': 'Rupture de médicament',
      'CATASTROPHE_NATURELLE': 'Catastrophe naturelle',
      'ALERTE_METEOROLOGIQUE': 'Alerte météorologique'
    };
    return labels[type] || type;
  }

  getUrgenceClass(urgence: string): string {
    switch (urgence) {
      case 'CRITIQUE':
        return 'bg-red-100 text-red-800';
      case 'URGENCE':
        return 'bg-orange-100 text-orange-800';
      case 'ALERTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ATTENTION':
        return 'bg-blue-100 text-blue-800';
      case 'INFO':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getUrgenceLabel(urgence: string): string {
    const labels: { [key: string]: string } = {
      'INFO': 'Information',
      'ATTENTION': 'Attention',
      'ALERTE': 'Alerte',
      'URGENCE': 'Urgence',
      'CRITIQUE': 'Critique'
    };
    return labels[urgence] || urgence;
  }

  isExpired(): boolean {
    if (!this.alerte?.dateExpiration) return false;
    return new Date(this.alerte.dateExpiration) < new Date();
  }

  getStatusColor(): string {
    if (!this.alerte?.active) return 'text-gray-600';
    if (this.isExpired()) return 'text-orange-600';
    return 'text-green-600';
  }

  getStatusLabel(): string {
    if (!this.alerte?.active) return 'Désactivée';
    if (this.isExpired()) return 'Expirée';
    return 'Active';
  }

  protected readonly Math = Math;
}
