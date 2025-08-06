import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureSanteService } from '../../../services/structure-sante.service';
import {StructureSante} from "../../../models/StructureSante";
import {TypeStructure} from "../../../models/enum";


@Component({
  selector: 'app-structure-sante-detail',
  templateUrl: './structure-sante-detail.component.html',
  styleUrls: ['./structure-sante-detail.component.css']
})
export class StructureSanteDetailComponent implements OnInit {
  structure: StructureSante | null = null;
  loading = true;
  showDeleteDialog = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structureSanteService: StructureSanteService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadStructure(id);
    });
  }

  loadStructure(id: number) {
    this.loading = true;
    this.structureSanteService.findById(id).subscribe({
      next: (structure) => {
        this.structure = structure;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la structure:', error);
        this.loading = false;
      }
    });
  }

  editStructure() {
    if (this.structure) {
      this.router.navigate(['/structures-sante', this.structure.id, 'edit']);
    }
  }

  confirmDelete() {
    this.showDeleteDialog = true;
  }

  deleteStructure() {
    if (this.structure) {
      this.structureSanteService.delete(this.structure.id).subscribe({
        next: () => {
          this.router.navigate(['/structures-sante']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showDeleteDialog = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  goBack() {
    this.router.navigate(['/structures-sante']);
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
