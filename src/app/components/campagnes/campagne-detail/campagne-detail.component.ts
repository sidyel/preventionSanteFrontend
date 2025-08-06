import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CampagneService} from '../../../services/campagne.service';
import {MessageService} from '../../../services/message.service';
import {AlerteService} from '../../../services/alerte.service';
import {StatusCampagne} from "../../../models/enum";
import {Message} from "../../../models/Message";
import {Campagne} from "../../../models/Campagne";
import {Alerte} from "../../../models/Alerte";


@Component({
  selector: 'app-campagne-detail',
  templateUrl: './campagne-detail.component.html',
  styleUrls: ['./campagne-detail.component.css']
})
export class CampagneDetailComponent implements OnInit {
  campagne: Campagne | null = null;
  messages: Message[] = [];
  alertes: Alerte[] = [];
  loading = true;
  loadingMessages = false;
  loadingAlertes = false;
  campagneId: number;
  activeTab = 'overview';

  // Progression update
  showProgressionModal = false;
  newProgression = 0;

  // Status update
  showStatusModal = false;
  newStatus: StatusCampagne = StatusCampagne.ACTIVE;
  statusOptions = Object.values(StatusCampagne);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campagneService: CampagneService,
    private messageService: MessageService,
    private alerteService: AlerteService
  ) {
    this.campagneId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadCampagne();
  }

  loadCampagne() {
    this.loading = true;
    this.campagneService.findById(this.campagneId).subscribe({
      next: (campagne) => {
        this.campagne = campagne;
        this.newProgression = campagne.progression || 0;
        this.newStatus = StatusCampagne.ACTIVE;
        ;
        this.loading = false;

        // Load related data
        this.loadMessages();
        this.loadAlertes();
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la campagne:', error);
        this.loading = false;
        this.router.navigate(['/campagnes']);
      }
    });
  }

  loadMessages() {
    this.loadingMessages = true;
    this.messageService.findByCampagneId(this.campagneId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.loadingMessages = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages:', error);
        this.loadingMessages = false;
      }
    });
  }

  loadAlertes() {
    this.loadingAlertes = true;
    // Assuming we have a method to find alertes by campaign
    // For now, we'll use a placeholder
    this.loadingAlertes = false;
    this.alertes = [];
  }

  editCampagne() {
    this.router.navigate(['/campagnes', this.campagneId, 'edit']);
  }

  deleteCampagne() {
    if (!this.campagne) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer la campagne "${this.campagne.nom}" ?`)) {
      this.campagneService.delete(this.campagneId).subscribe({
        next: () => {
          this.router.navigate(['/campagnes']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  updateProgression() {
    if (!this.campagne) return;

    this.campagneService.updateProgression(this.campagneId, this.newProgression).subscribe({
      next: () => {
        this.campagne!.progression = this.newProgression;
        this.showProgressionModal = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la progression:', error);
      }
    });
  }

  updateStatus() {
    if (!this.campagne) return;

    this.campagneService.updateStatus(this.campagneId, this.newStatus).subscribe({
      next: () => {
        this.campagne!.status = this.newStatus;
        this.showStatusModal = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    });
  }

  createMessage() {
    this.router.navigate(['/messages/new'], {
      queryParams: { campagneId: this.campagneId }
    });
  }

  createAlerte() {
    this.router.navigate(['/alertes/new'], {
      queryParams: { campagneId: this.campagneId }
    });
  }

  goBack() {
    this.router.navigate(['/campagnes']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'TERMINEE':
        return 'bg-gray-100 text-gray-800';
      case 'SUSPENDUE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ANNULEE':
        return 'bg-red-100 text-red-800';
      case 'BROUILLON':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'BROUILLON': 'Brouillon',
      'ACTIVE': 'Active',
      'TERMINEE': 'Terminée',
      'SUSPENDUE': 'Suspendue',
      'ANNULEE': 'Annulée'
    };
    return labels[status] || status;
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'PREVENTION_PALUDISME': 'Prévention Paludisme',
      'HYGIENE_EAU': 'Hygiène et Eau',
      'VACCINATION': 'Vaccination',
      'NUTRITION': 'Nutrition',
      'SANTE_MATERNELLE': 'Santé Maternelle',
      'EDUCATION_SANITAIRE': 'Éducation Sanitaire',
      'LUTTE_EPIDEMIE': 'Lutte contre les Épidémies',
      'SENSIBILISATION_GENERALE': 'Sensibilisation Générale'
    };
    return labels[type] || type;
  }

  getPrioriteClass(priorite: string): string {
    switch (priorite) {
      case 'URGENTE':
        return 'bg-red-100 text-red-800';
      case 'HAUTE':
        return 'bg-orange-100 text-orange-800';
      case 'NORMALE':
        return 'bg-blue-100 text-blue-800';
      case 'BASSE':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPrioriteLabel(priorite: string): string {
    const labels: { [key: string]: string } = {
      'URGENTE': 'Urgente',
      'HAUTE': 'Haute',
      'NORMALE': 'Normale',
      'BASSE': 'Basse'
    };
    return labels[priorite] || priorite;
  }

  viewMessage(messageId: number) {
    this.router.navigate(['/messages', messageId]);
  }

  viewAlerte(alerteId: number) {
    this.router.navigate(['/alertes', alerteId]);
  }

  protected readonly StatusCampagne = StatusCampagne;
}
