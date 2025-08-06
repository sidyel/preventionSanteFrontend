import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopulationRuraleService } from '../../../services/population-rurale.service';
import {getRegionNames} from "../../../models/senegal-regions";
import {Sexe, TypeActeur} from "../../../models/enum";
import {PopulationRurale} from "../../../models/PopulationRurale";
import {User} from "../../../models/User";


@Component({
  selector: 'app-population-rurale-form',
  templateUrl: './population-rurale-form.component.html',
  styleUrls: ['./population-rurale-form.component.css']
})
export class PopulationRuraleFormComponent implements OnInit {
  populationForm!: FormGroup;
  userForm!: FormGroup;
  loading = false;
  isEditMode = false;
  personId: number | null = null;

  regions = getRegionNames();
  sexeOptions = Object.values(Sexe);
  langues = ['Français', 'Wolof', 'Pulaar', 'Serer', 'Mandinka', 'Diola', 'Soninké'];

  constructor(
    private fb: FormBuilder,
    private populationRuraleService: PopulationRuraleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.personId = +params['id'];
        this.isEditMode = true;
        this.loadPerson();
      }
    });
  }

  initForms() {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      region: ['', Validators.required],
      commune: [''],
      village: ['']
    });

    this.populationForm = this.fb.group({
      profession: [''],
      age: ['', [Validators.min(0), Validators.max(120)]],
      sexe: ['', Validators.required],
      languePreferee: ['Français'],
      alphabetise: [false],
      groupeCommunautaire: [''],
      personneContact: [''],
      telephoneContact: ['', Validators.pattern(/^[0-9+\-\s()]+$/)]
    });
  }

  loadPerson() {
    if (!this.personId) return;

    this.loading = true;
    this.populationRuraleService.findById(this.personId).subscribe({
      next: (person) => {
        this.populateForms(person);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.loading = false;
      }
    });
  }

  populateForms(person: PopulationRurale) {
    // Populate user form
    if (person.user) {
      this.userForm.patchValue({
        nom: person.user.nom,
        prenom: person.user.prenom,
        email: person.user.email,
        telephone: person.user.telephone,
        region: person.user.region,
        commune: person.user.commune,
        village: person.user.village
      });
    }

    // Populate population form
    this.populationForm.patchValue({
      profession: person.profession,
      age: person.age,
      sexe: person.sexe,
      languePreferee: person.languePreferee,
      alphabetise: person.alphabetise,
      groupeCommunautaire: person.groupeCommunautaire,
      personneContact: person.personneContact,
      telephoneContact: person.telephoneContact
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.populationForm.valid) {
      this.loading = true;

      const userData: User = {
        ...this.userForm.value,
        typeActeur: TypeActeur.POPULATION_RURALE,
        actif: true,
        dateCreation: new Date()
      };

      const populationData: PopulationRurale = {
        ...this.populationForm.value,
        user: userData
      };

      if (this.isEditMode && this.personId) {
        populationData.id = this.personId;
        userData.id = this.personId;

        this.populationRuraleService.update(this.personId, populationData).subscribe({
          next: () => {
            this.router.navigate(['/population-rurale', this.personId]);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.loading = false;
          }
        });
      } else {
        this.populationRuraleService.create(populationData).subscribe({
          next: (createdPerson) => {
            this.router.navigate(['/population-rurale', createdPerson.id]);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.userForm);
      this.markFormGroupTouched(this.populationForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    if (this.isEditMode && this.personId) {
      this.router.navigate(['/population-rurale', this.personId]);
    } else {
      this.router.navigate(['/population-rurale']);
    }
  }

  getSexeLabel(sexe: string): string {
    return sexe === 'MASCULIN' ? 'Masculin' : 'Féminin';
  }
}
