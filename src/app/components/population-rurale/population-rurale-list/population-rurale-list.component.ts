import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopulationRuraleService } from '../../../services/population-rurale.service';
import {PopulationRurale} from "../../../models/PopulationRurale";
import {Sexe} from "../../../models/enum";

@Component({
  selector: 'app-population-rurale-list',
  templateUrl: './population-rurale-list.component.html',
  styleUrls: ['./population-rurale-list.component.css']
})
export class PopulationRuraleListComponent implements OnInit {
  population: PopulationRurale[] = [];
  filteredPopulation: PopulationRurale[] = [];
  loading = true;
  searchTerm = '';
  selectedRegion = '';
  selectedSexe = '';
  selectedAlphabetise = '';
  ageMin = '';
  ageMax = '';

  regions = ['Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Kaolack', 'Fatick', 'Kolda', 'Ziguinchor', 'Louga', 'Matam', 'Kaffrine', 'Tambacounda', 'Kédougou', 'Sédhiou'];
  sexeOptions = Object.values(Sexe);

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private populationRuraleService: PopulationRuraleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPopulation();
  }

  loadPopulation() {
    this.loading = true;
    this.populationRuraleService.findAll().subscribe({
      next: (data) => {
        this.population = data;
        this.filteredPopulation = data;
        this.totalItems = data.length;
        this.loading = false;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la population:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredPopulation = this.population.filter(person => {
      const matchesSearch = !this.searchTerm ||
        person.user?.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        person.user?.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        person.profession?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRegion = !this.selectedRegion ||
        person.user?.region === this.selectedRegion;

      const matchesSexe = !this.selectedSexe ||
        person.sexe === this.selectedSexe;

      const matchesAlphabetise = this.selectedAlphabetise === '' ||
        person.alphabetise?.toString() === this.selectedAlphabetise;

      const matchesAge = (!this.ageMin || !person.age || person.age >= +this.ageMin) &&
        (!this.ageMax || !person.age || person.age <= +this.ageMax);

      return matchesSearch && matchesRegion && matchesSexe && matchesAlphabetise && matchesAge;
    });

    this.totalItems = this.filteredPopulation.length;
    this.currentPage = 1;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.target.value;
    this.applyFilters();
  }

  onSexeChange(event: any) {
    this.selectedSexe = event.target.value;
    this.applyFilters();
  }

  onAlphabetiseChange(event: any) {
    this.selectedAlphabetise = event.target.value;
    this.applyFilters();
  }

  onAgeFilter() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedRegion = '';
    this.selectedSexe = '';
    this.selectedAlphabetise = '';
    this.ageMin = '';
    this.ageMax = '';
    this.applyFilters();
  }

  getPaginatedItems(): PopulationRurale[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPopulation.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  viewPerson(id: number) {
    this.router.navigate(['/population-rurale', id]);
  }

  editPerson(id: number) {
    this.router.navigate(['/population-rurale', id, 'edit']);
  }

  createPerson() {
    this.router.navigate(['/population-rurale/new']);
  }

  deletePerson(person: PopulationRurale) {
    const fullName = `${person.user?.prenom} ${person.user?.nom}`;
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${fullName}" ?`)) {
      this.populationRuraleService.delete(person.id).subscribe({
        next: () => {
          this.loadPopulation();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  getSexeLabel(sexe: string): string {
    return sexe === 'MASCULIN' ? 'Masculin' : 'Féminin';
  }

  protected readonly Math = Math;
}
