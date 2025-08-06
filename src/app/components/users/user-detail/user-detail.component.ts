import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {User} from "../../../models/User";
import {TypeActeur} from "../../../models/enum";


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  showDeleteDialog = false;

  typeActeurLabels = {
    [TypeActeur.STRUCTURE_SANTE]: 'Structure de Santé',
    [TypeActeur.ONG]: 'ONG',
    [TypeActeur.POPULATION_RURALE]: 'Population Rurale'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/users']);
      return;
    }

    this.loading = true;
    this.userService.findById(+id).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        this.loading = false;
        this.router.navigate(['/users']);
      }
    });
  }

  onEdit() {
    if (this.user?.id) {
      this.router.navigate(['/users', this.user.id, 'edit']);
    }
  }

  confirmDelete() {
    this.showDeleteDialog = true;
  }

  onDeleteConfirmed() {
    if (this.user?.id) {
      this.userService.delete(this.user.id).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showDeleteDialog = false;
        }
      });
    }
  }

  onDeleteCancelled() {
    this.showDeleteDialog = false;
  }

  toggleUserStatus() {
    if (!this.user?.id) return;

    const action = this.user.actif ?
      this.userService.deactivateUser(this.user.id) :
      this.userService.activateUser(this.user.id);

    action.subscribe({
      next: () => {
        this.loadUser();
      },
      error: (error) => {
        console.error('Erreur lors du changement de statut:', error);
      }
    });
  }

  getTypeActeurLabel(type: TypeActeur): string {
    return this.typeActeurLabels[type] || type;
  }
}
