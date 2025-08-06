import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { CampagneService } from '../../../services/campagne.service';
import {PrioriteMessage, TypeMessage} from "../../../models/enum";
import {Campagne} from "../../../models/Campagne";
import {User} from "../../../models/User";
import {Message} from "../../../models/Message";


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup;
  loading = false;
  isEditMode = false;
  messageId: number | null = null;
  selectedCampagneId: number | null = null;

  typeOptions = Object.values(TypeMessage);
  prioriteOptions = Object.values(PrioriteMessage);
  langues = ['FR', 'WO', 'PL', 'SR'];

  campagnes: Campagne[] = [];
  destinataires: User[] = [];
  selectedDestinataires: number[] = [];

  // File upload
  selectedFile: File | null = null;
  filePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
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
        this.messageForm.patchValue({ campagne: this.selectedCampagneId });
      }
    });

    // Check for route params (edit mode)
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.messageId = +params['id'];
        this.isEditMode = true;
        this.loadMessage();
      }
    });

    this.loadCampagnes();
    this.loadDestinataires();
  }

  initForm() {
    this.messageForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      contenu: ['', [Validators.required, Validators.minLength(10)]],
      typeMessage: ['', Validators.required],
      priorite: [PrioriteMessage.NORMALE, Validators.required],
      langue: ['FR', Validators.required],
      campagne: [''],
      urlImage: ['', Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)],
      urlVideo: ['', Validators.pattern(/^https?:\/\/.+\.(mp4|avi|mov|wmv)$/i)]
    });
  }

  loadMessage() {
    if (!this.messageId) return;

    this.loading = true;
    this.messageService.findById(this.messageId).subscribe({
      next: (message) => {
        this.populateForm(message);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du message:', error);
        this.loading = false;
      }
    });
  }

  populateForm(message: Message) {
    this.messageForm.patchValue({
      titre: message.titre,
      contenu: message.contenu,
      typeMessage: message.typeMessage,
      priorite: message.priorite,
      langue: message.langue,
      campagne: message.campagne?.id,
      urlImage: message.urlImage,
      urlVideo: message.urlVideo
    });

    // Load selected destinataires
    if (message.destinataires) {
      this.selectedDestinataires = message.destinataires
        .map(d => d.destinataire.id)                   // id: number | undefined
        .filter((id): id is number => id !== undefined);  // ne garde que les number
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.filePreview = null;
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.loading = true;

      const messageData: any = {
        ...this.messageForm.value,
        expediteur: { id: 1 }, // Assure-toi que l’utilisateur existe
        campagne: this.messageForm.value.campagne
          ? { id: +this.messageForm.value.campagne }   // le + transforme en number
          : null,        destinataires: this.selectedDestinataires.map(id => ({ destinataire: { id } })),
        dateCreation: new Date().toISOString(), // Assure un format ISO clair
        envoye: false
      };
      console.log("📤 Message envoyé au backend:", JSON.stringify(messageData, null, 2));

      if (this.isEditMode && this.messageId) {
        messageData.id = this.messageId;

        this.messageService.update(this.messageId, messageData).subscribe({
          next: () => {
            this.router.navigate(['/messages', this.messageId]);
            console.log('Message à envoyer', messageData)
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.loading = false;
            console.log('Message à envoyer', messageData)
          }
        });
      } else {
        this.messageService.create(messageData).subscribe({
          next: (createdMessage) => {
            if (this.selectedDestinataires.length > 0) {
              // If destinataires are selected, send the message
              const id = createdMessage.id ?? 0;

              this.messageService.envoyerMessage(id, this.selectedDestinataires).subscribe({
                next: () => {
                  this.router.navigate(['/messages', createdMessage.id]);
                },
                error: (error) => {
                  console.error('Erreur lors de l\'envoi:', error);
                  // Still navigate to the message, but show it wasn't sent
                  this.router.navigate(['/messages', createdMessage.id]);
                }
              });
            } else {
              this.router.navigate(['/messages', createdMessage.id]);
            }
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.messageForm);
    }
  }

  saveDraft() {
    if (this.messageForm.get('titre')?.valid && this.messageForm.get('contenu')?.valid) {
      this.onSubmit();
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    if (this.isEditMode && this.messageId) {
      this.router.navigate(['/messages', this.messageId]);
    } else {
      this.router.navigate(['/messages']);
    }
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
