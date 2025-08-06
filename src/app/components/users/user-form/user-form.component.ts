import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {TypeActeur} from "../../../models/enum";
import {User} from "../../../models/User";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  isEditMode = false;
  userId: number | null = null;

  typeActeurOptions = [
    { value: TypeActeur.STRUCTURE_SANTE, label: 'Structure de Santé' },
    { value: TypeActeur.ONG, label: 'ONG' },
    { value: TypeActeur.POPULATION_RURALE, label: 'Population Rurale' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm() {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      typeActeur: ['', Validators.required],
      region: [''],
      commune: [''],
      village: [''],
      actif: [true]
    });
  }

  private checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser();
    }
  }

  private loadUser() {
    if (!this.userId) return;

    this.loading = true;
    this.userService.findById(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        this.loading = false;
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const userData: User = this.userForm.value;

      const request = this.isEditMode && this.userId ?
        this.userService.update(this.userId, userData) :
        this.userService.create(userData);

      request.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
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
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} est requis.`;
      }
      if (field.errors['email']) {
        return 'Format d\'email invalide.';
      }
      if (field.errors['minlength']) {
        return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères.`;
      }
      if (field.errors['pattern']) {
        return 'Format invalide.';
      }
    }
    return '';
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
