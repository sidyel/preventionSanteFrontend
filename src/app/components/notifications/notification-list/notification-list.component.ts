import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import {TypeNotification} from "../../../models/enum";
import {Notification} from "../../../models/Notification";


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;

  // Données de test - remplacez par l'utilisateur connecté
  currentUserId = 1;

  typeOptions = [
    { value: TypeNotification.NOUVEAU_MESSAGE, label: 'Nouveau Message', icon: 'mail', class: 'bg-blue-100 text-blue-800' },
    { value: TypeNotification.NOUVELLE_ALERTE, label: 'Nouvelle Alerte', icon: 'alert-triangle', class: 'bg-red-100 text-red-800' },
    { value: TypeNotification.CAMPAGNE_DEMARREE, label: 'Campagne Démarrée', icon: 'play', class: 'bg-green-100 text-green-800' },
    { value: TypeNotification.CAMPAGNE_TERMINEE, label: 'Campagne Terminée', icon: 'check', class: 'bg-gray-100 text-gray-800' },
    { value: TypeNotification.RAPPEL, label: 'Rappel', icon: 'clock', class: 'bg-yellow-100 text-yellow-800' },
    { value: TypeNotification.SYSTEME, label: 'Système', icon: 'settings', class: 'bg-purple-100 text-purple-800' }
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;

    this.notificationService.findByDestinataireId(this.currentUserId).subscribe({
      next: (notifications) => {
        this.notifications = notifications.sort((a, b) => {
          const dateA = new Date(a.dateCreation || 0).getTime();
          const dateB = new Date(b.dateCreation || 0).getTime();
          return dateB - dateA; // Plus récent en premier
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notifications:', error);
        this.loading = false;
      }
    });
  }

  markAsRead(notification: Notification) {
    if (!notification.id || notification.lu) return;

    this.notificationService.marquerCommeLu(notification.id).subscribe({
      next: () => {
        notification.lu = true;
        notification.dateLecture = new Date();
      },
      error: (error) => {
        console.error('Erreur lors du marquage comme lu:', error);
      }
    });
  }

  markAllAsRead() {
    const unreadNotifications = this.notifications.filter(n => !n.lu && n.id);

    unreadNotifications.forEach(notification => {
      if (notification.id) {
        this.notificationService.marquerCommeLu(notification.id).subscribe({
          next: () => {
            notification.lu = true;
            notification.dateLecture = new Date();
          },
          error: (error) => {
            console.error('Erreur lors du marquage comme lu:', error);
          }
        });
      }
    });
  }

  deleteNotification(notification: Notification) {
    if (!notification.id) return;

    this.notificationService.delete(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
      }
    });
  }

  getTypeOption(type: TypeNotification) {
    return this.typeOptions.find(opt => opt.value === type) || {
      value: type,
      label: type,
      icon: 'bell',
      class: 'bg-gray-100 text-gray-800'
    };
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  navigateToAction(notification: Notification) {
    if (notification.urlAction) {
      // Navigation vers l'action spécifiée
      window.location.href = notification.urlAction;
    }
    this.markAsRead(notification);
  }
}
