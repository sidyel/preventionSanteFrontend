import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StructureSanteService } from '../../../services/structure-sante.service';
import { UserService } from '../../../services/user.service';
import {TypeActeur, TypeStructure} from "../../../models/enum";
import {User} from "../../../models/User";
import {StructureSante} from "../../../models/StructureSante";


@Component({
  selector: 'app-structure-sante-form',
  templateUrl: './structure-sante-form.component.html',
  styleUrls: ['./structure-sante-form.component.css']
})
export class StructureSanteFormComponent implements OnInit {
  structureForm!: FormGroup;
  userForm!: FormGroup;
  isEditMode = false;
  structureId: number | null = null;
  loading = false;

  typesStructure = Object.values(TypeStructure);
  regionsSenegal = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga',
    'Fatick', 'Kaolack', 'Kolda', 'Ziguinchor', 'Tambacounda',
    'Kaffrine', 'Kédougou', 'Matam', 'Sédhiou'
  ];

  // Départements par région
  departements: { [key: string]: string[] } = {
    'Dakar': ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque'],
    'Thiès': ['Thiès', 'Mbour', 'Tivaouane'],
    'Saint-Louis': ['Saint-Louis', 'Dagana', 'Podor'],
    'Diourbel': ['Diourbel', 'Bambey', 'Mbacké'],
    'Louga': ['Louga', 'Kébémer', 'Linguère'],
    'Fatick': ['Fatick', 'Foundiougne', 'Gossas'],
    'Kaolack': ['Kaolack', 'Guinguinéo', 'Nioro du Rip'],
    'Kolda': ['Kolda', 'Médina Yoro Foulah', 'Vélingara'],
    'Ziguinchor': ['Ziguinchor', 'Bignona', 'Oussouye'],
    'Tambacounda': ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum'],
    'Kaffrine': ['Kaffrine', 'Birkelane', 'Koungheul', 'Malem-Hodar'],
    'Kédougou': ['Kédougou', 'Salémata', 'Saraya'],
    'Matam': ['Matam', 'Kanel', 'Ranérou'],
    'Sédhiou': ['Sédhiou', 'Bounkiling', 'Goudomp']
  };

  selectedDepartements: string[] = [];

  constructor(
    private fb: FormBuilder,
    private structureSanteService: StructureSanteService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.structureId = +params['id'];
        this.loadStructure();
      }
    });
  }

  initForms() {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]+$/)]],
      region: ['', Validators.required],
      commune: [''],
      village: ['']
    });

    this.structureForm = this.fb.group({
      nomStructure: ['', [Validators.required, Validators.minLength(3)]],
      typeStructure: ['', Validators.required],
      numeroAgrement: [''],
      description: [''],
      adresse: [''],
      capaciteAccueil: ['', [Validators.min(1)]],
      specialites: ['']
    });

    // Écouter les changements de région pour mettre à jour les départements
    this.userForm.get('region')?.valueChanges.subscribe(region => {
      this.selectedDepartements = this.departements[region] || [];
      if (region) {
        this.userForm.get('commune')?.setValue('');
      }
    });
  }

  loadStructure() {
    if (this.structureId) {
      this.loading = true;
      this.structureSanteService.findById(this.structureId).subscribe({
        next: (structure) => {
          this.userForm.patchValue({
            nom: structure.user.nom,
            prenom: structure.user.prenom,
            email: structure.user.email,
            telephone: structure.user.telephone,
            region: structure.user.region,
            commune: structure.user.commune,
            village: structure.user.village
          });

          this.structureForm.patchValue({
            nomStructure: structure.nomStructure,
            typeStructure: structure.typeStructure,
            numeroAgrement: structure.numeroAgrement,
            description: structure.description,
            adresse: structure.adresse,
            capaciteAccueil: structure.capaciteAccueil,
            specialites: structure.specialites
          });

          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la structure:', error);
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.structureForm.valid) {
      this.loading = true;

      const userData: User = {
        ...this.userForm.value,
        typeActeur: TypeActeur.STRUCTURE_SANTE,
        dateCreation: new Date(),
        actif: true
      };

      const structureData: StructureSante = {
        ...this.structureForm.value,
        user: userData
      };

      if (this.isEditMode && this.structureId) {
        structureData.id = this.structureId;
        userData.id = this.structureId; // Assuming user ID matches structure ID

        this.structureSanteService.update(this.structureId, structureData).subscribe({
          next: () => {
            this.router.navigate(['/structures-sante']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.loading = false;
          }
        });
      } else {
        this.structureSanteService.create(structureData).subscribe({
          next: () => {
            this.router.navigate(['/structures-sante']);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.userForm);
      this.markFormGroupTouched(this.structureForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  cancel() {
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
