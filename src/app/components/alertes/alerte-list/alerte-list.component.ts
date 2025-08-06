import { Component, OnInit } from '@angular/core';
import { AlerteService } from '../../../services/alerte.service';
import {Alerte} from "../../../models/Alerte";
import {NiveauUrgence, TypeAlerte} from "../../../models/enum";

@Component({
  selector: 'app-alerte-list',
  templateUrl: './alerte-list.component.html',
  styleUrls: ['./alerte-list.component.css']
})
export class AlerteListComponent implements OnInit {
  alertes: Alerte[] = [];
  filteredAlertes: Alerte[] = [];
  loading = true;

  // Filtres
  searchTerm = '';
  selectedType: TypeAlerte | '' = '';
  selectedUrgence: NiveauUrgence | '' = '';
  showActiveOnly = true;
  showUnreadOnly = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Données de test - remplacez par l'utilisateur connecté
  currentUserId = 1;

  typeOptions = [
    { value: TypeAlerte.EPIDEMIE, label: 'Épidémie', class: 'bg-red-100 text-red-800' },
    { value: TypeAlerte.CONTAMINATION_EAU, label: 'Contamination Eau', class: 'bg-blue-100 text-blue-800' },
    { value: TypeAlerte.ALERTE_SANITAIRE, label: 'Alerte Sanitaire', class: 'bg-yellow-100 text-yellow-800' },
    { value: TypeAlerte.VACCINATION_URGENTE, label: 'Vaccination Urgente', class: 'bg-green-100 text-green-800' },
    { value: TypeAlerte.RUPTURE_MEDICAMENT, label: 'Rupture Médicament', class: 'bg-orange-100 text-orange-800' },
    { value: TypeAlerte.CATASTROPHE_NATURELLE, label: 'Catastrophe Naturelle', class: 'bg-purple-100 text-purple-800' },
    { value: TypeAlerte.ALERTE_METEOROLOGIQUE, label: 'Alerte Météorologique', class: 'bg-indigo-100 text-indigo-800' }
  ];

  urgenceOptions = [
    { value: NiveauUrgence.INFO, label: 'Info', class: 'bg-gray-100 text-gray-800' },
    { value: NiveauUrgence.ATTENTION, label: 'Attention', class: 'bg-blue-100 text-blue-800' },
    { value: NiveauUrgence.ALERTE, label: 'Alerte', class: 'bg-yellow-100 text-yellow-800' },
    { value: NiveauUrgence.URGENCE, label: 'Urgence', class: 'bg-orange-100 text-orange-800' },
    { value: NiveauUrgence.CRITIQUE, label: 'Critique', class: 'bg-red-100 text-red-800' }
  ];

  constructor(private alerteService: AlerteService) {}

  ngOnInit() {
    this.loadAlertes();
  }

  loadAlertes() {
    this.loading = true;

    // Chargez les alertes reçues par l'utilisateur connecté
    this.alerteService.findByDestinataireId(this.currentUserId).subscribe({
      next: (alertes) => {
        this.alertes = alertes;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des alertes:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.alertes];

    // Filtre par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(alerte =>
        alerte.titre.toLowerCase().includes(term) ||
        alerte.description.toLowerCase().includes(term) ||
        alerte.zoneAffectee?.toLowerCase().includes(term)
      );
    }

    // Filtre par type
    if (this.selectedType) {
      filtered = filtered.filter(alerte => alerte.typeAlerte === this.selectedType);
    }

    // Filtre par niveau d'urgence
    if (this.selectedUrgence) {
      filtered = filtered.filter(alerte => alerte.niveauUrgence === this.selectedUrgence);
    }

    // Filtre alertes actives seulement
    if (this.showActiveOnly) {
      filtered = filtered.filter(alerte => alerte.active !== false);
    }

    // Filtre non lues seulement
    if (this.showUnreadOnly) {
      filtered = filtered.filter(alerte =>
        !alerte.destinataires?.some(dest =>
          dest.destinataire.id === this.currentUserId && dest.lu
        )
      );
    }

    this.filteredAlertes = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onFilterChange() {
    this.applyFilters();
  }

  getPaginatedAlertes(): Alerte[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAlertes.slice(startIndex, endIndex);
  }

  isAlerteRead(alerte: Alerte): boolean {
    if (!alerte?.destinataires || !Array.isArray(alerte.destinataires)) {
      return false;
    }

    return alerte.destinataires
      // on enlève tous les dest ou dest.destinataire manquants
      .filter(dest => dest != null && dest.destinataire?.id != null)
      .some(dest =>
        dest.destinataire!.id === this.currentUserId && dest.lu
      );
  }

  isAlerteAccused(alerte: Alerte): boolean {
    if (!alerte?.destinataires) {
      return false;
    }

    return alerte.destinataires
      .filter(dest => dest != null && dest.destinataire?.id != null)
      .some(dest =>
        dest.destinataire!.id === this.currentUserId && dest.accuse
      );
  }


  markAsRead(alerte: Alerte) {
    if (!alerte.id || this.isAlerteRead(alerte)) return;

    this.alerteService.marquerCommeLu(alerte.id, this.currentUserId).subscribe({
      next: () => {
        this.loadAlertes();
      },
      error: (error) => {
        console.error('Erreur lors du marquage comme lu:', error);
      }
    });
  }

  accuseReception(alerte: Alerte) {
    if (!alerte.id || this.isAlerteAccused(alerte)) return;

    this.alerteService.accuserReception(alerte.id, this.currentUserId).subscribe({
      next: () => {
        this.loadAlertes();
      },
      error: (error) => {
        console.error('Erreur lors de l\'accusé de réception:', error);
      }
    });
  }

  getTypeLabel(type: TypeAlerte): string {
    const option = this.typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  getTypeClass(type: TypeAlerte): string {
    const option = this.typeOptions.find(opt => opt.value === type);
    return option ? option.class : 'bg-gray-100 text-gray-800';
  }

  getUrgenceLabel(urgence: NiveauUrgence): string {
    const option = this.urgenceOptions.find(opt => opt.value === urgence);
    return option ? option.label : urgence;
  }

  getUrgenceClass(urgence: NiveauUrgence): string {
    const option = this.urgenceOptions.find(opt => opt.value === urgence);
    return option ? option.class : 'bg-gray-100 text-gray-800';
  }

  isExpired(alerte: Alerte): boolean {
    if (!alerte.dateExpiration) return false;
    return new Date(alerte.dateExpiration) < new Date();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  protected readonly Math = Math;
}
