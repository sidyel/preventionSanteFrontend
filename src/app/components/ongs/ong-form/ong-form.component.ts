import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OngService } from '../../../services/ong.service';
import { UserService } from '../../../services/user.service';

import {DomaineIntervention, TypeActeur} from "../../../models/enum";
import {Ong} from "../../../models/Ong";
import {User} from "../../../models/User";
import {getDepartmentsByRegion, getRegionNames} from "../../../models/senegal-regions";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-ong-form',
  templateUrl: './ong-form.component.html',
  styleUrls: ['./ong-form.component.css']
})
export class OngFormComponent implements OnInit {
  ongForm!: FormGroup ;
  userForm!: FormGroup ;
  mainForm!: FormGroup;

  loading = false;
  isEditMode = false;
  ongId: number | null = null;

  domaineOptions = Object.values(DomaineIntervention);
  regions = getRegionNames();
  departments: string[] = [];
  communes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private ongService: OngService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ongId = +params['id'];
        this.isEditMode = true;
        this.loadOng();
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

    this.ongForm = this.fb.group({
      nomOng: ['', [Validators.required, Validators.minLength(3)]],
      numeroEnregistrement: [''],
      domaineIntervention: ['', Validators.required],
      mission: ['', [Validators.required, Validators.minLength(10)]],
      vision: [''],
      siteWeb: ['', Validators.pattern(/^https?:\/\/.+/)],
      nombreEmployes: ['', [Validators.min(1), Validators.max(10000)]],
      zonesIntervention: ['']
    });

    // Watch region changes
    this.userForm.get('region')?.valueChanges.subscribe(region => {
      this.departments = getDepartmentsByRegion(region);
      this.userForm.patchValue({ commune: '', village: '' });
      this.communes = [];
    });

    // Watch commune changes (if you want to use departments)
    this.userForm.get('commune')?.valueChanges.subscribe(commune => {
      // For simplicity, we'll use communes directly from regions
      // You could implement department selection if needed
    });

    this.mainForm = this.fb.group({
      user: this.userForm,
      ong: this.ongForm
    });
  }

  loadOng() {
    if (!this.ongId) return;

    this.loading = true;
    this.ongService.findById(this.ongId).subscribe({
      next: (ong) => {
        this.populateForms(ong);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'ONG:', error);
        this.loading = false;
      }
    });
  }

  populateForms(ong: Ong) {
    // Populate user form
    if (ong.user) {
      this.userForm.patchValue({
        nom: ong.user.nom,
        prenom: ong.user.prenom,
        email: ong.user.email,
        telephone: ong.user.telephone,
        region: ong.user.region,
        commune: ong.user.commune,
        village: ong.user.village
      });

      // Load departments for selected region
      if (ong.user.region) {
        this.departments = getDepartmentsByRegion(ong.user.region);
      }
    }

    // Populate ong form
    this.ongForm.patchValue({
      nomOng: ong.nomOng,
      numeroEnregistrement: ong.numeroEnregistrement,
      domaineIntervention: ong.domaineIntervention,
      mission: ong.mission,
      vision: ong.vision,
      siteWeb: ong.siteWeb,
      nombreEmployes: ong.nombreEmployes,
      zonesIntervention: ong.zonesIntervention
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.ongForm.valid) {
      this.loading = true;

      const userData: User = {
        ...this.userForm.value,
        typeActeur: TypeActeur.ONG,
        actif: true,
        dateCreation: new Date()
      };

      const ongData: Ong = {
        ...this.ongForm.value,
        user: userData
      };

      if (this.isEditMode && this.ongId) {
        ongData.id = this.ongId;
        userData.id = this.ongId; // Assuming user ID matches ONG ID in edit mode

        this.ongService.update(this.ongId, ongData).subscribe({
          next: () => {
            this.router.navigate(['/ongs', this.ongId]);
          },
          error: (err: HttpErrorResponse) => {
            console.error('POST /api/ongs échoué');
            console.error('Status     :', err.status, err.statusText);
            console.error('Response   :', err.error);
            this.loading = false;
          }
        });
      } else {
        this.ongService.create(ongData).subscribe({
          next: (createdOng) => {
            this.router.navigate(['/ongs', createdOng.id]);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.userForm);
      this.markFormGroupTouched(this.ongForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    if (this.isEditMode && this.ongId) {
      this.router.navigate(['/ongs', this.ongId]);
    } else {
      this.router.navigate(['/ongs']);
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
}
