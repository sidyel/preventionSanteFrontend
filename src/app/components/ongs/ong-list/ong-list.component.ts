import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OngService } from '../../../services/ong.service';
import {DomaineIntervention} from "../../../models/enum";
import {Ong} from "../../../models/Ong";


@Component({
  selector: 'app-ong-list',
  templateUrl: './ong-list.component.html',
  styleUrls: ['./ong-list.component.css']
})
export class OngListComponent implements OnInit {
  ongs: Ong[] = [];
  filteredOngs: Ong[] = [];
  loading = true;
  searchTerm = '';
  selectedDomaine = '';
  selectedRegion = '';

  domaineOptions = Object.values(DomaineIntervention);
  regions = ['Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Kaolack', 'Fatick', 'Kolda', 'Ziguinchor', 'Louga', 'Matam', 'Kaffrine', 'Tambacounda', 'Kédougou', 'Sédhiou'];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private ongService: OngService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOngs();
  }

  loadOngs() {
    this.loading = true;
    this.ongService.findAll().subscribe({
      next: (data) => {
        this.ongs = data;
        this.filteredOngs = data;
        this.totalItems = data.length;
        this.loading = false;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des ONGs:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredOngs = this.ongs.filter(ong => {
      const matchesSearch = !this.searchTerm ||
        ong.nomOng.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ong.mission?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDomaine = !this.selectedDomaine ||
        ong.domaineIntervention === this.selectedDomaine;

      const matchesRegion = !this.selectedRegion ||
        ong.user?.region === this.selectedRegion;

      return matchesSearch && matchesDomaine && matchesRegion;
    });

    this.totalItems = this.filteredOngs.length;
    this.currentPage = 1;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onDomaineChange(event: any) {
    this.selectedDomaine = event.target.value;
    this.applyFilters();
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.target.value;
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDomaine = '';
    this.selectedRegion = '';
    this.applyFilters();
  }

  getPaginatedItems(): Ong[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOngs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  viewOng(id: number) {
    this.router.navigate(['/ongs', id]);
  }

  editOng(id: number) {
    this.router.navigate(['/ongs', id, 'edit']);
  }

  createOng() {
    this.router.navigate(['/ongs/new']);
  }

  deleteOng(ong: Ong) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'ONG "${ong.nomOng}" ?`)) {
      this.ongService.delete(ong.id).subscribe({
        next: () => {
          this.loadOngs();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  getDomaineLabel(domaine: string): string {
    const labels: { [key: string]: string } = {
      'SANTE_PUBLIQUE': 'Santé Publique',
      'PREVENTION_MALADIES': 'Prévention des Maladies',
      'NUTRITION': 'Nutrition',
      'HYGIENE_ASSAINISSEMENT': 'Hygiène et Assainissement',
      'SANTE_MATERNELLE': 'Santé Maternelle',
      'VACCINATION': 'Vaccination',
      'LUTTE_PALUDISME': 'Lutte contre le Paludisme',
      'EDUCATION_SANITAIRE': 'Éducation Sanitaire'
    };
    return labels[domaine] || domaine;
  }

  protected readonly Math = Math;
}
