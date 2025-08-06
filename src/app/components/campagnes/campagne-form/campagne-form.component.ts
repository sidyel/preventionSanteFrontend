import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampagneService } from '../../../services/campagne.service';
import { UserService } from '../../../services/user.service';
import {StatusCampagne, TypeCampagne} from "../../../models/enum";
import {User} from "../../../models/User";
import {Campagne} from "../../../models/Campagne";


@Component({
  selector: 'app-campagne-form',
  templateUrl: './campagne-form.component.html',
  styleUrls: ['./campagne-form.component.css']
})
export class CampagneFormComponent implements OnInit {
  campagneForm!: FormGroup;
  loading = false;
  isEditMode = false;
  campagneId: number | null = null;
  users: User[] = [];

  statusOptions = [
    { value: StatusCampagne.BROUILLON, label: 'Brouillon' },
    { value: StatusCampagne.ACTIVE, label: 'Active' },
    { value: StatusCampagne.TERMINEE, label: 'Terminée' },
    { value: StatusCampagne.SUSPENDUE, label: 'Suspendue' },
    { value: StatusCampagne.ANNULEE, label: 'Annulée' }
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

  constructor(
    private formBuilder: FormBuilder,
    private campagneService: CampagneService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUsers();
    this.checkEditMode();
  }

  private initializeForm() {
    this.campagneForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      typeCampagne: ['', Validators.required],
      status: [StatusCampagne.BROUILLON],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      objectifs: [''],
      publicCible: [''],
      zonesGeographiques: [''],
      nombreParticipants: [0, [Validators.min(0)]],
      progression: [0, [Validators.min(0), Validators.max(100)]],
      budget: [0, [Validators.min(0)]],
      userId: ['', Validators.required]
    });
  }

  private loadUsers() {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    });
  }

  private checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.campagneId = +id;
      this.loadCampagne();
    }
  }

  private loadCampagne() {
    if (!this.campagneId) return;

    this.loading = true;
    this.campagneService.findById(this.campagneId).subscribe({
      next: (campagne) => {
        // Format dates for input fields
        const formValue = {
          ...campagne,
          dateDebut: this.formatDateForInput(campagne.dateDebut),
          dateFin: this.formatDateForInput(campagne.dateFin),
          userId: campagne.user.id
        };
        this.campagneForm.patchValue(formValue);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la campagne:', error);
        this.loading = false;
        this.router.navigate(['/campagnes']);
      }
    });
  }

  private formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.campagneForm.valid) {
      this.loading = true;
      const formValue = this.campagneForm.value;

      // Find user object
      const user = this.users.find(u => u.id === +formValue.userId);
      if (!user) {
        console.error('Utilisateur non trouvé');
        this.loading = false;
        return;
      }

      const campagneData: Campagne = {
        ...formValue,
        user: user,
        dateDebut: new Date(formValue.dateDebut),
        dateFin: new Date(formValue.dateFin)
      };

      const request = this.isEditMode && this.campagneId ?
        this.campagneService.update(this.campagneId, campagneData) :
        this.campagneService.create(campagneData);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/campagnes']);
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde:', error);
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.campagneForm.controls).forEach(field => {
      const control = this.campagneForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.campagneForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} est requis.`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères.`;
      }
      if (field.errors['min']) {
        return `La valeur doit être supérieure ou égale à ${field.errors['min'].min}.`;
      }
      if (field.errors['max']) {
        return `La valeur doit être inférieure ou égale à ${field.errors['max'].max}.`;
      }
    }
    return '';
  }

  onCancel() {
    this.router.navigate(['/campagnes']);
  }
}
