import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import {PrioriteMessage, TypeMessage} from "../../../models/enum";
import {Message} from "../../../models/Message";


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  filteredMessages: Message[] = [];
  loading = true;

  // Filtres
  searchTerm = '';
  selectedType: TypeMessage | '' = '';
  selectedPriorite: PrioriteMessage | '' = '';
  showUnreadOnly = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Données de test - remplacez par l'utilisateur connecté
  currentUserId = 1;

  typeOptions = [
    { value: TypeMessage.INFORMATION, label: 'Information', class: 'bg-blue-100 text-blue-800' },
    { value: TypeMessage.SENSIBILISATION, label: 'Sensibilisation', class: 'bg-green-100 text-green-800' },
    { value: TypeMessage.PREVENTION, label: 'Prévention', class: 'bg-yellow-100 text-yellow-800' },
    { value: TypeMessage.CONSEIL, label: 'Conseil', class: 'bg-purple-100 text-purple-800' },
    { value: TypeMessage.RAPPEL, label: 'Rappel', class: 'bg-orange-100 text-orange-800' },
    { value: TypeMessage.FORMATION, label: 'Formation', class: 'bg-indigo-100 text-indigo-800' }
  ];

  prioriteOptions = [
    { value: PrioriteMessage.BASSE, label: 'Basse', class: 'bg-gray-100 text-gray-800' },
    { value: PrioriteMessage.NORMALE, label: 'Normale', class: 'bg-blue-100 text-blue-800' },
    { value: PrioriteMessage.HAUTE, label: 'Haute', class: 'bg-orange-100 text-orange-800' },
    { value: PrioriteMessage.URGENTE, label: 'Urgente', class: 'bg-red-100 text-red-800' }
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;

    // Chargez les messages reçus par l'utilisateur connecté
    this.messageService.findByDestinataireId(this.currentUserId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des messages:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.messages];

    // Filtre par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(message =>
        message.titre.toLowerCase().includes(term) ||
        message.contenu.toLowerCase().includes(term) ||
        message.expediteur.nom.toLowerCase().includes(term) ||
        message.expediteur.prenom.toLowerCase().includes(term)
      );
    }

    // Filtre par type
    if (this.selectedType) {
      filtered = filtered.filter(message => message.typeMessage === this.selectedType);
    }

    // Filtre par priorité
    if (this.selectedPriorite) {
      filtered = filtered.filter(message => message.priorite === this.selectedPriorite);
    }

    // Filtre non lus seulement
    if (this.showUnreadOnly) {
      filtered = filtered.filter(message =>
        !message.destinataires?.some(dest =>
          dest.destinataire.id === this.currentUserId && dest.lu
        )
      );
    }

    this.filteredMessages = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onFilterChange() {
    this.applyFilters();
  }

  getPaginatedMessages(): Message[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMessages.slice(startIndex, endIndex);
  }

  isMessageRead(message: Message): boolean {
    // 1) message.destinataires doit exister et être un array
    if (!Array.isArray(message.destinataires) || message.destinataires.length === 0) {
      return false;
    }

    // 2) filtre les destinataires invalides
    return message.destinataires
      .filter(dest => dest != null && dest.destinataire?.id != null)
      .some(dest =>
        dest.destinataire!.id === this.currentUserId && dest.lu
      );
  }


  markAsRead(message: Message): void {
    // 1) Si pas d'id, ou déjà lu, on ne fait rien
    if (!message.id || this.isMessageRead(message)) {
      return;
    }

    // 2) Appel au service pour marquer comme lu
    this.messageService.marquerCommeLu(message.id, this.currentUserId)
      .subscribe({
        next: () => {
          // 3) Une fois la requête réussie, on recharge la liste
          this.loadMessages();
        },
        error: (error) => {
          console.error('Erreur lors du marquage comme lu :', error);
        }
      });
  }

  getTypeLabel(type: TypeMessage): string {
    const option = this.typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  getTypeClass(type: TypeMessage): string {
    const option = this.typeOptions.find(opt => opt.value === type);
    return option ? option.class : 'bg-gray-100 text-gray-800';
  }

  getPrioriteLabel(priorite: PrioriteMessage): string {
    const option = this.prioriteOptions.find(opt => opt.value === priorite);
    return option ? option.label : priorite;
  }

  getPrioriteClass(priorite: PrioriteMessage): string {
    const option = this.prioriteOptions.find(opt => opt.value === priorite);
    return option ? option.class : 'bg-gray-100 text-gray-800';
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  protected readonly Math = Math;
}
