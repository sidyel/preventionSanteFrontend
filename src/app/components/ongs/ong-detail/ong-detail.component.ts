import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OngService } from '../../../services/ong.service';
import { Ong } from '../../../models/Ong';
import { DomaineIntervention } from '../../../models/enum';

@Component({
  selector: 'app-ong-detail',
  templateUrl: './ong-detail.component.html',
  styleUrls: ['./ong-detail.component.css']
})
export class OngDetailComponent implements OnInit {
  ong: Ong | null = null;
  loading = true;
  error: string | null = null;
  ongId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ongService: OngService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ongId = +params['id'];
        this.loadOng();
      } else {
        this.error = 'ID de l\'ONG non fourni';
        this.loading = false;
      }
    });
  }

  loadOng(): void {
    if (!this.ongId) {
      this.error = 'ID de l\'ONG invalide';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.ongService.findById(this.ongId).subscribe({
      next: (ong: Ong) => {
        this.ong = ong;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'ONG:', error);
        this.error = 'Impossible de charger les détails de l\'ONG. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  editOng(): void {
    if (this.ongId) {
      this.router.navigate(['/ongs', this.ongId, 'edit']);
    }
  }

  deleteOng(): void {
    if (!this.ong || !this.ongId) return;

    const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'ONG "${this.ong.nomOng}" ?\n\nCette action est irréversible.`;

    if (confirm(confirmMessage)) {
      this.loading = true;

      this.ongService.delete(this.ongId).subscribe({
        next: () => {
          this.router.navigate(['/ongs']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.error = 'Impossible de supprimer l\'ONG. Veuillez réessayer.';
          this.loading = false;
        }
      });
    }
  }

  sendMessage(): void {
    if (this.ong?.user?.id) {
      this.router.navigate(['/messages/new'], {
        queryParams: {
          recipientId: this.ong.user.id,
          recipientName: `${this.ong.user.prenom} ${this.ong.user.nom}`,
          recipientType: 'ONG'
        }
      });
    }
  }

  createCampaign(): void {
    if (this.ongId) {
      this.router.navigate(['/campagnes/new'], {
        queryParams: {
          ongId: this.ongId,
          ongName: this.ong?.nomOng
        }
      });
    }
  }

  getDomaineLabel(domaine: DomaineIntervention): string {
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

  // Navigation helpers - consistent with other components
  viewAllOngs(): void {
    this.router.navigate(['/ongs']);
  }

  viewOngsByDomain(): void {
    if (this.ong?.domaineIntervention) {
      this.router.navigate(['/ongs'], {
        queryParams: { domaine: this.ong.domaineIntervention }
      });
    }
  }

  viewOngsByRegion(): void {
    if (this.ong?.user?.region) {
      this.router.navigate(['/ongs'], {
        queryParams: { region: this.ong.user.region }
      });
    }
  }
}
