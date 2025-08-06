import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import {Message} from "../../../models/Message";
import {User} from "../../../models/User";


@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  message: Message | null = null;
  loading = true;
  messageId: number;

  // Send functionality
  showSendModal = false;
  destinataires: User[] = [];
  selectedDestinataires: number[] = [];
  sendingMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.messageId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadMessage();
    this.loadDestinataires();
  }

  loadMessage() {
    this.loading = true;
    this.messageService.findById(this.messageId).subscribe({
      next: (message) => {
        this.message = message;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du message:', error);
        this.loading = false;
        this.router.navigate(['/messages']);
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

  editMessage() {
    this.router.navigate(['/messages', this.messageId, 'edit']);
  }

  deleteMessage() {
    if (!this.message) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer le message "${this.message.titre}" ?`)) {
      this.messageService.delete(this.messageId).subscribe({
        next: () => {
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  openSendModal() {
    this.showSendModal = true;
    this.selectedDestinataires = [];
  }

  onDestinataireChange(userId: number, event: any) {
    if (event.target.checked) {
      this.selectedDestinataires.push(userId);
    } else {
      this.selectedDestinataires = this.selectedDestinataires.filter(id => id !== userId);
    }
  }

  sendMessage() {
    if (this.selectedDestinataires.length === 0) return;

    this.sendingMessage = true;
    this.messageService.envoyerMessage(this.messageId, this.selectedDestinataires).subscribe({
      next: (updatedMessage) => {
        this.message = updatedMessage;
        this.showSendModal = false;
        this.sendingMessage = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi:', error);
        this.sendingMessage = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/messages']);
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'INFORMATION': 'Information',
      'SENSIBILISATION': 'Sensibilisation',
      'PREVENTION': 'Prévention',
      'CONSEIL': 'Conseil',
      'RAPPEL': 'Rappel',
      'FORMATION': 'Formation'
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

  getLangueLabel(langue: string): string {
    const labels: { [key: string]: string } = {
      'FR': 'Français',
      'WO': 'Wolof',
      'PL': 'Pulaar',
      'SR': 'Serer'
    };
    return labels[langue] || langue;
  }
}
