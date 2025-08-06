import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureSanteService } from '../../../services/structure-sante.service';
import {StructureSante} from "../../../models/StructureSante";
import {TypeStructure} from "../../../models/enum";


@Component({
  selector: 'app-structure-sante-list',
  templateUrl: './structure-sante-list.component.html',
  styleUrls: ['./structure-sante-list.component.css']
})
export class StructureSanteListComponent implements OnInit {
  structures: StructureSante[] = [];
  filteredStructures: StructureSante[] = [];
  loading = false;

  // Filtres
  selectedTypeStructure = '';
  selectedRegion = '';
  searchTerm = '';

  // Options pour les filtres
  typesStructure = Object.values(TypeStructure);
  regionsSenegal = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga',
    'Fatick', 'Kaolack', 'Kolda', 'Ziguinchor', 'Tambacounda',
    'Kaffrine', 'Kédougou', 'Matam', 'Sédhiou'
  ];

  // Confirmation dialog
  showDeleteDialog = false;
  structureToDelete: StructureSante | null = null;

  constructor(
    private structureSanteService: StructureSanteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStructures();
  }

  loadStructures() {
    this.loading = true;
    this.structureSanteService.findAll().subscribe({
      next: (structures) => {
        this.structures = structures;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des structures:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredStructures = this.structures.filter(structure => {
      const matchesType = !this.selectedTypeStructure ||
        structure.typeStructure === this.selectedTypeStructure;

      const matchesRegion = !this.selectedRegion ||
        structure.user?.region === this.selectedRegion;

      const matchesSearch = !this.searchTerm ||
        structure.nomStructure.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        structure.user?.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        structure.user?.prenom.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesType && matchesRegion && matchesSearch;
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.selectedTypeStructure = '';
    this.selectedRegion = '';
    this.searchTerm = '';
    this.applyFilters();
  }

  viewStructure(id: number) {
    this.router.navigate(['/structures-sante', id]);
  }

  editStructure(id: number) {
    this.router.navigate(['/structures-sante', id, 'edit']);
  }

  confirmDelete(structure: StructureSante) {
    this.structureToDelete = structure;
    this.showDeleteDialog = true;
  }

  deleteStructure() {
    if (this.structureToDelete) {
      this.structureSanteService.delete(this.structureToDelete.id).subscribe({
        next: () => {
          this.loadStructures();
          this.showDeleteDialog = false;
          this.structureToDelete = null;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showDeleteDialog = false;
          this.structureToDelete = null;
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteDialog = false;
    this.structureToDelete = null;
  }

  getTypeStructureLabel(type: TypeStructure): string {
    const labels: { [key in TypeStructure]: string } = {
      [TypeStructure.HOPITAL]: 'Hôpital',
      [TypeStructure.CENTRE_SANTE]: 'Centre de Santé',
      [TypeStructure.DISPENSAIRE]: 'Dispensaire',
      [TypeStructure.CLINIQUE]: 'Clinique',
      [TypeStructure.MATERNITE]: 'Maternité',
      [TypeStructure.LABORATOIRE]: 'Laboratoire'
    };
    return labels[type] || type;
  }
}
