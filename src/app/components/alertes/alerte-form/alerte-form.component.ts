import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlerteService } from '../../../services/alerte.service';
import { UserService } from '../../../services/user.service';
import { CampagneService } from '../../../services/campagne.service';
import {NiveauUrgence, TypeAlerte} from "../../../models/enum";
import {getRegionNames} from "../../../models/senegal-regions";
import {Campagne} from "../../../models/Campagne";
import {User} from "../../../models/User";
import {Alerte} from "../../../models/Alerte";


@Component({
  selector: 'app-alerte-form',
  templateUrl: './alerte-form.component.html',
  styleUrls: ['./alerte-form.component.css']
})
export class AlerteFormComponent implements OnInit {
  alerteForm!: FormGroup;
  loading = false;
  isEditMode = false;
  alerteId: number | null = null;
  selectedCampagneId: number | null = null;

  typeOptions = Object.values(TypeAlerte);
  urgenceOptions = Object.values(NiveauUrgence);
  regions = getRegionNames();

  campagnes: Campagne[] = [];
  destinataires: User[] = [];
  selectedDestinataires: number[] = [];

  constructor(
    private fb: FormBuilder,
    private alerteService: AlerteService,
    private userService: UserService,
    private campagneService: CampagneService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    // Check for query params (campagne association)
    this.route.queryParams.subscribe(params => {
      if (params['campagneId']) {
        this.selectedCampagneId = +params['campagneId'];
        this.alerteForm.patchValue({ campagne: this.selectedCampagneId });
      }
    });

    // Check for route params (edit mode)
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.alerteId = +params['id'];
        this.isEditMode = true;
        this.loadAlerte();
      }
    });

    this.loadCampagnes();
    this.loadDestinataires();
  }

  initForm() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.alerteForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      typeAlerte: ['', Validators.required],
      niveauUrgence: [NiveauUrgence.ATTENTION, Validators.required],
      zoneAffectee: [''],
      mesuresPreventives: [''],
      consignesSuivre: [''],
      dateExpiration: [tomorrow.toISOString().slice(0, 16)],
      campagne: ['']
    });
  }

  loadAlerte() {
    if (!this.alerteId) return;

    this.loading = true;
    this.alerteService.findById(this.alerteId).subscribe({
      next: (alerte) => {
        this.populateForm(alerte);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'alerte:', error);
        this.loading = false;
      }
    });
  }

  populateForm(alerte: Alerte) {
    this.alerteForm.patchValue({
      titre: alerte.titre,
      description: alerte.description,
      typeAlerte: alerte.typeAlerte,
      niveauUrgence: alerte.niveauUrgence,
      zoneAffectee: alerte.zoneAffectee,
      mesuresPreventives: alerte.mesuresPreventives,
      consignesSuivre: alerte.consignesSuivre,
      dateExpiration: alerte.dateExpiration ? new Date(alerte.dateExpiration).toISOString().slice(0, 16) : '',
      campagne: alerte.campagne?.id
    });

    // Load selected destinataires
    if (alerte.destinataires) {
      this.selectedDestinataires = alerte.destinataires.map(d => d.destinataire.id!);
    }
  }

  loadCampagnes() {
    this.campagneService.findAll().subscribe({
      next: (campagnes) => {
        this.campagnes = campagnes.filter(c => c.status === 'ACTIVE' || c.status === 'BROUILLON');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des campagnes:', error);
      }
    });
  }

  loadDestinataires() {
    this.userService.findActiveUsers().subscribe({
      next: (users) => {
        this.destinataires = users;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des destinataires:', error);
      }
    });
  }

  onDestinataireChange(userId: number, event: any) {
    if (event.target.checked) {
      this.selectedDestinataires.push(userId);
    } else {
      this.selectedDestinataires = this.selectedDestinataires.filter(id => id !== userId);
    }
  }

  selectAllDestinataires(event: any) {
    if (event.target.checked) {
      this.selectedDestinataires = this.destinataires
        .map(u => u.id)
        .filter((id): id is number => id !== undefined);
    } else {
      this.selectedDestinataires = [];
    }
  }

  filterDestinatairesByZone() {
    const zoneAffectee = this.alerteForm.get('zoneAffectee')?.value;
    if (zoneAffectee && this.regions.includes(zoneAffectee)) {
      // Auto-select users from the affected zone
      const usersInZone = this.destinataires
        .filter(user => user.region === zoneAffectee)
        .map(user => user.id);

      this.selectedDestinataires = this.destinataires
        .map(u => u.id)
        .filter((id): id is number => id !== undefined);
    }
  }

  onSubmit() {
    if (this.alerteForm.valid) {
      this.loading = true;

      const alerteData: Alerte = {
        ...this.alerteForm.value,
        expediteur: { id: 1 }, // Replace with current user ID
        campagne: this.alerteForm.value.campagne ? { id: this.alerteForm.value.campagne } : null,
        dateCreation: new Date(),
        active: true,
        dateExpiration: this.alerteForm.value.dateExpiration ? new Date(this.alerteForm.value.dateExpiration) : null
      };

      if (this.isEditMode && this.alerteId) {
        alerteData.id = this.alerteId;

        this.alerteService.update(this.alerteId, alerteData).subscribe({
          next: () => {
            this.router.navigate(['/alertes', this.alerteId]);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.loading = false;
          }
        });
      } else {
        this.alerteService.create(alerteData).subscribe({
          next: (createdAlerte) => {
            if (this.selectedDestinataires.length > 0) {
              // If destinataires are selected, send the alert
              this.alerteService.diffuserAlerte(createdAlerte.id!, this.selectedDestinataires).subscribe({
                next: () => {
                  this.router.navigate(['/alertes', createdAlerte.id]);
                },
                error: (error) => {
                  console.error('Erreur lors de la diffusion:', error);
                  // Still navigate to the alert, but show it wasn't sent
                  this.router.navigate(['/alertes', createdAlerte.id]);
                }
              });
            } else {
              this.router.navigate(['/alertes', createdAlerte.id]);
            }
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.alerteForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    if (this.isEditMode && this.alerteId) {
      this.router.navigate(['/alertes', this.alerteId]);
    } else {
      this.router.navigate(['/alertes']);
    }
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'EPIDEMIE': 'Épidémie',
      'CONTAMINATION_EAU': 'Contamination de l\'eau',
      'ALERTE_SANITAIRE': 'Alerte sanitaire',
      'VACCINATION_URGENTE': 'Vaccination urgente',
      'RUPTURE_MEDICAMENT': 'Rupture de médicament',
      'CATASTROPHE_NATURELLE': 'Catastrophe naturelle',
      'ALERTE_METEOROLOGIQUE': 'Alerte météorologique'
    };
    return labels[type] || type;
  }

  getUrgenceLabel(urgence: string): string {
    const labels: { [key: string]: string } = {
      'INFO': 'Information',
      'ATTENTION': 'Attention',
      'ALERTE': 'Alerte',
      'URGENCE': 'Urgence',
      'CRITIQUE': 'Critique'
    };
    return labels[urgence] || urgence;
  }

  getUrgenceColor(urgence: string): string {
    switch (urgence) {
      case 'CRITIQUE':
        return 'text-red-600';
      case 'URGENCE':
        return 'text-orange-600';
      case 'ALERTE':
        return 'text-yellow-600';
      case 'ATTENTION':
        return 'text-blue-600';
      case 'INFO':
      default:
        return 'text-gray-600';
    }
  }
}
