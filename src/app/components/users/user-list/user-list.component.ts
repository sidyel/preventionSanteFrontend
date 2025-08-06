import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {User} from "../../../models/User";
import {TypeActeur} from "../../../models/enum";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = true;

  // Filtres
  searchTerm = '';
  selectedTypeActeur: TypeActeur | '' = '';
  selectedRegion = '';
  showActiveOnly = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Confirmation dialog
  showDeleteDialog = false;
  userToDelete: User | null = null;

  typeActeurOptions = [
    { value: TypeActeur.STRUCTURE_SANTE, label: 'Structure de Santé' },
    { value: TypeActeur.ONG, label: 'ONG' },
    { value: TypeActeur.POPULATION_RURALE, label: 'Population Rurale' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.users];

    // Filtre par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.nom.toLowerCase().includes(term) ||
        user.prenom.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.telephone.includes(term)
      );
    }

    // Filtre par type d'acteur
    if (this.selectedTypeActeur) {
      filtered = filtered.filter(user => user.typeActeur === this.selectedTypeActeur);
    }

    // Filtre par région
    if (this.selectedRegion) {
      filtered = filtered.filter(user => user.region === this.selectedRegion);
    }

    // Filtre utilisateurs actifs seulement
    if (this.showActiveOnly) {
      filtered = filtered.filter(user => user.actif !== false);
    }

    this.filteredUsers = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  confirmDelete(user: User) {
    this.userToDelete = user;
    this.showDeleteDialog = true;
  }

  onDeleteConfirmed() {
    if (this.userToDelete?.id) {
      this.userService.delete(this.userToDelete.id).subscribe({
        next: () => {
          this.loadUsers();
          this.showDeleteDialog = false;
          this.userToDelete = null;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showDeleteDialog = false;
          this.userToDelete = null;
        }
      });
    }
  }

  onDeleteCancelled() {
    this.showDeleteDialog = false;
    this.userToDelete = null;
  }

  toggleUserStatus(user: User) {
    if (!user.id) return;

    const action = user.actif ?
      this.userService.deactivateUser(user.id) :
      this.userService.activateUser(user.id);

    action.subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Erreur lors du changement de statut:', error);
      }
    });
  }

  getTypeActeurLabel(type: TypeActeur): string {
    const option = this.typeActeurOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  protected readonly Math = Math;
}
