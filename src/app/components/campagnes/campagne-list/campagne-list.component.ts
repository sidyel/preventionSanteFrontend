import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../../../services/campagne.service';
import {Campagne} from "../../../models/Campagne";
import {StatusCampagne, TypeCampagne} from "../../../models/enum";

@Component({
  selector: 'app-campagne-list',
  templateUrl: './campagne-list.component.html',
  styleUrls: ['./campagne-list.component.css']
})
export class CampagneListComponent implements OnInit {
  campagnes: Campagne[] = [];
  filteredCampagnes: Campagne[] = [];
  loading = true;

  // Filtres
  searchTerm = '';
  selectedStatus: StatusCampagne | '' = '';
  selectedType: TypeCampagne | '' = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Confirmation dialog
  showDeleteDialog = false;
  campagneToDelete: Campagne | null = null;

  statusOptions = [
    { value: StatusCampagne.BROUILLON, label: 'Brouillon', class: 'bg-blue-100 text-blue-800' },
    { value: StatusCampagne.ACTIVE, label: 'Active', class: 'bg-success-100 text-success-800' },
    { value: StatusCampagne.TERMINEE, label: 'Terminée', class: 'bg-gray-100 text-gray-800' },
    { value: StatusCampagne.SUSPENDUE, label: 'Suspendue', class: 'bg-warning-100 text-warning-800' },
    { value: StatusCampagne.ANNULEE, label: 'Annulée', class: 'bg-danger-100 text-danger-800' }
  ];

  typeOptions = [
    { value: TypeCampagne.PREVENTION_PALUDISME, label: 'Prévention Paludisme' },
    { value: TypeCampagne.HYGIENE_EAU, label: 'Hygiène et Eau' },
    { value: TypeCampagne.VACCINATION, label: 'Vaccination' },
    { value: TypeCampagne.NUTRITION, label: 'Nutrition' },
    { value: TypeCampagne.SANTE_MATERNELLE, label: 'Santé Maternelle' },
    { value: TypeCampagne.EDUCATION_SANITAIRE, label: 'Éducation Sanitaire' },
    { value: TypeCampagne.LUTTE_EPIDEMIE, label: 'Lutte contre Épidémie' },
    { value: TypeCampagne.SENSIBILISATION_GENERALE, label: 'Sensibilisation Générale' }
  ];

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    this.loadCampagnes();
  }

  loadCampagnes() {
    this.loading = true;

    this.campagneService.findAll().subscribe({
      next: (campagnes) => {
        this.campagnes = campagnes;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des campagnes:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.campagnes];

    // Filtre par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(campagne =>
        campagne.nom.toLowerCase().includes(term) ||
        campagne.description?.toLowerCase().includes(term) ||
        campagne.objectifs?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (this.selectedStatus) {
      filtered = filtered.filter(campagne => campagne.status === this.selectedStatus);
    }

    // Filtre par type
    if (this.selectedType) {
      filtered = filtered.filter(campagne => campagne.typeCampagne === this.selectedType);
    }

    this.filteredCampagnes = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  getPaginatedCampagnes(): Campagne[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCampagnes.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  confirmDelete(campagne: Campagne) {
    this.campagneToDelete = campagne;
    this.showDeleteDialog = true;
  }

  onDeleteConfirmed() {
    if (this.campagneToDelete?.id) {
      this.campagneService.delete(this.campagneToDelete.id).subscribe({
        next: () => {
          this.loadCampagnes();
          this.showDeleteDialog = false;
          this.campagneToDelete = null;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showDeleteDialog = false;
          this.campagneToDelete = null;
        }
      });
    }
  }

  onDeleteCancelled() {
    this.showDeleteDialog = false;
    this.campagneToDelete = null;
  }

  updateCampagneStatus(campagne: Campagne, newStatus: StatusCampagne) {
    if (!campagne.id) return;

    this.campagneService.updateStatus(campagne.id, newStatus).subscribe({
      next: () => {
        this.loadCampagnes();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    });
  }

  getStatusLabel(status: StatusCampagne): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  }

  getStatusClass(status: StatusCampagne): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.class : 'bg-gray-100 text-gray-800';
  }

  getTypeLabel(type: TypeCampagne): string {
    const option = this.typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  getProgressColor(progression: number): string {
    if (progression >= 80) return 'bg-success-500';
    if (progression >= 50) return 'bg-warning-500';
    return 'bg-primary-500';
  }

  protected readonly StatusCampagne = StatusCampagne;
  protected readonly Math = Math;
}
