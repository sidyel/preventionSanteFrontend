import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HptService} from "../../../models/HptService";
import {HptTarif} from "../../../models/HptTarif";
import {HptTicketService} from "../../../services/hpt-ticket.service";
import {HptUserService} from "../../../services/hpt-user.service";
import {HptServiceService} from "../../../services/hpt-service.service";


@Component({
  selector: 'app-hpt-ticket-create',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-hpt-header></app-hpt-header>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="hpt-card">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Créer un nouveau ticket</h1>

          <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Informations utilisateur -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input type="text"
                       formControlName="firstName"
                       class="hpt-input"
                       placeholder="Votre prénom">
                <div *ngIf="ticketForm.get('firstName')?.invalid && ticketForm.get('firstName')?.touched"
                     class="text-red-500 text-sm mt-1">
                  Le prénom est requis
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input type="text"
                       formControlName="lastName"
                       class="hpt-input"
                       placeholder="Votre nom">
                <div *ngIf="ticketForm.get('lastName')?.invalid && ticketForm.get('lastName')?.touched"
                     class="text-red-500 text-sm mt-1">
                  Le nom est requis
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email"
                       formControlName="email"
                       class="hpt-input"
                       placeholder="votre@email.com">
                <div *ngIf="ticketForm.get('email')?.invalid && ticketForm.get('email')?.touched"
                     class="text-red-500 text-sm mt-1">
                  Email valide requis
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel"
                       formControlName="phone"
                       class="hpt-input"
                       placeholder="+221 XX XXX XX XX">
              </div>
            </div>

            <!-- Sélection du service -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Service *</label>
              <select formControlName="serviceId"
                      (change)="onServiceChange()"
                      class="hpt-input">
                <option value="">Sélectionnez un service</option>
                <option *ngFor="let service of services" [value]="service.id">
                  {{ service.name }} - {{ service.hospitalName }}
                </option>
              </select>
              <div *ngIf="ticketForm.get('serviceId')?.invalid && ticketForm.get('serviceId')?.touched"
                   class="text-red-500 text-sm mt-1">
                Veuillez sélectionner un service
              </div>
            </div>

            <!-- Sélection du tarif -->
            <div *ngIf="availableTarifs.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-1">Prestation *</label>
              <div class="space-y-3">
                <div *ngFor="let tarif of availableTarifs"
                     class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-hpt-primary transition-colors"
                     [ngClass]="{'border-hpt-primary bg-blue-50': selectedTarif?.id === tarif.id}"
                     (click)="selectTarif(tarif)">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">{{ tarif.procedureName }}</h4>
                      <p *ngIf="tarif.description" class="text-gray-600 text-sm mt-1">
                        {{ tarif.description }}
                      </p>
                      <p *ngIf="tarif.duration" class="text-gray-500 text-sm mt-1">
                        Durée: {{ tarif.duration }} minutes
                      </p>
                    </div>
                    <div class="text-right">
                      <div class="text-xl font-bold text-hpt-primary">
                        {{ tarif.price | currency:'XOF':'symbol':'1.0-0' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sélection de la date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date et heure du rendez-vous *</label>
              <input type="datetime-local"
                     formControlName="appointmentDate"
                     class="hpt-input"
                     [min]="minDate">
              <div *ngIf="ticketForm.get('appointmentDate')?.invalid && ticketForm.get('appointmentDate')?.touched"
                   class="text-red-500 text-sm mt-1">
                Veuillez sélectionner une date
              </div>
            </div>

            <!-- Résumé -->
            <div *ngIf="selectedTarif" class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Résumé de votre réservation</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Service:</span>
                  <span class="font-medium">{{ getSelectedService()?.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Hôpital:</span>
                  <span class="font-medium">{{ getSelectedService()?.hospitalName }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Prestation:</span>
                  <span class="font-medium">{{ selectedTarif.procedureName }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-hpt-primary">
                  <span>Total:</span>
                  <span>{{ selectedTarif.price | currency:'XOF':'symbol':'1.0-0' }}</span>
                </div>
              </div>
            </div>

            <!-- Boutons -->
            <div class="flex justify-end space-x-4">
              <button type="button"
                      (click)="goBack()"
                      class="hpt-btn hpt-btn-secondary">
                Annuler
              </button>
              <button type="submit"
                      [disabled]="ticketForm.invalid || !selectedTarif || isSubmitting"
                      class="hpt-btn hpt-btn-primary">
                <span *ngIf="isSubmitting">Création en cours...</span>
                <span *ngIf="!isSubmitting">Créer le ticket</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class HptTicketCreateComponent implements OnInit {
  ticketForm: FormGroup;
  services: HptService[] = [];
  availableTarifs: HptTarif[] = [];
  selectedTarif: HptTarif | null = null;
  isSubmitting = false;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hptTicketService: HptTicketService,
    private hptUserService: HptUserService,
    private hptServiceService: HptServiceService
  ) {
    this.ticketForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      serviceId: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });

    // Date minimale = demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadServices();

    // Pré-sélection du service si passé en paramètre
    const serviceId = this.route.snapshot.queryParamMap.get('serviceId');
    if (serviceId) {
      this.ticketForm.patchValue({ serviceId: +serviceId });
      this.onServiceChange();
    }
  }

  loadServices(): void {
    this.hptServiceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des services:', error);
      }
    });
  }

  onServiceChange(): void {
    const serviceId = this.ticketForm.get('serviceId')?.value;
    const selectedService = this.services.find(s => s.id === +serviceId);

    if (selectedService && selectedService.tarifs) {
      this.availableTarifs = selectedService.tarifs;
      this.selectedTarif = null;
    } else {
      this.availableTarifs = [];
      this.selectedTarif = null;
    }
  }

  selectTarif(tarif: HptTarif): void {
    this.selectedTarif = tarif;
  }

  getSelectedService(): HptService | undefined {
    const serviceId = this.ticketForm.get('serviceId')?.value;
    return this.services.find(s => s.id === +serviceId);
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.selectedTarif) {
      this.isSubmitting = true;

      // Créer ou récupérer l'utilisateur
      const userData = {
        firstName: this.ticketForm.get('firstName')?.value,
        lastName: this.ticketForm.get('lastName')?.value,
        email: this.ticketForm.get('email')?.value,
        phone: this.ticketForm.get('phone')?.value
      };

      this.hptUserService.createUser(userData).subscribe({
        next: (user) => {
          this.createTicket(user.id);
        },
        error: (error) => {
          // Si l'utilisateur existe déjà, récupérer par email
          this.hptUserService.getUserByEmail(userData.email).subscribe({
            next: (user) => {
              this.createTicket(user.id);
            },
            error: (err) => {
              console.error('Erreur lors de la création/récupération de l\'utilisateur:', err);
              this.isSubmitting = false;
            }
          });
        }
      });
    }
  }

  private createTicket(userId: number): void {
    const ticketData = {
      userId: userId,
      tarifId: this.selectedTarif!.id,
      appointmentDate: this.ticketForm.get('appointmentDate')?.value
    };

    this.hptTicketService.createTicket(ticketData).subscribe({
      next: (ticket) => {
        this.router.navigate(['/tickets', ticket.id], {
          queryParams: { created: 'true' }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la création du ticket:', error);
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/hospitals']);
  }
}
