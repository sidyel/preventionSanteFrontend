import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './components/auth/login/login.component';

// Users
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';

// Structures Santé
import { StructureSanteListComponent } from './components/structures-sante/structure-sante-list/structure-sante-list.component';
import { StructureSanteFormComponent } from './components/structures-sante/structure-sante-form/structure-sante-form.component';
import { StructureSanteDetailComponent } from './components/structures-sante/structure-sante-detail/structure-sante-detail.component';

// ONGs
import { OngListComponent } from './components/ongs/ong-list/ong-list.component';
import { OngFormComponent } from './components/ongs/ong-form/ong-form.component';
import { OngDetailComponent } from './components/ongs/ong-detail/ong-detail.component';

// Campagnes
import { CampagneListComponent } from './components/campagnes/campagne-list/campagne-list.component';
import { CampagneFormComponent } from './components/campagnes/campagne-form/campagne-form.component';
import { CampagneDetailComponent } from './components/campagnes/campagne-detail/campagne-detail.component';

// Messages
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { MessageFormComponent } from './components/messages/message-form/message-form.component';
import { MessageDetailComponent } from './components/messages/message-detail/message-detail.component';

// Alertes
import { AlerteListComponent } from './components/alertes/alerte-list/alerte-list.component';
import { AlerteFormComponent } from './components/alertes/alerte-form/alerte-form.component';
import { AlerteDetailComponent } from './components/alertes/alerte-detail/alerte-detail.component';

// Notifications
import { NotificationListComponent } from './components/notifications/notification-list/notification-list.component';
import { DashboardComponent } from "./components/dashboard/dashboard/dashboard.component";
import { HptDashboardComponent } from "./features/hpt-dashboard/hpt-dashboard.component";
import { HptHospitalListComponent } from "./features/hpt-hospitals/hpt-hospital-list/hpt-hospital-list.component";
import { HptHospitalDetailComponent } from "./features/hpt-hospitals/hpt-hospital-detail/hpt-hospital-detail.component";
import { HptTicketListComponent } from "./features/hpt-tickets/hpt-ticket-list/hpt-ticket-list.component";
import { HptTicketCreateComponent } from "./features/hpt-tickets/hpt-ticket-create/hpt-ticket-create.component";
import { AcceuilComponent } from "./acceuil/acceuil.component";

const routes: Routes = [
  // Page d'accueil publique
  { path: '', component: AcceuilComponent },

  // Routes d'authentification
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

  // Routes avec layout dashboard
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      // Users routes
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'users/:id/edit', component: UserFormComponent },

      // Structures Santé routes
      { path: 'structures-sante', component: StructureSanteListComponent },
      { path: 'structures-sante/new', component: StructureSanteFormComponent },
      { path: 'structures-sante/:id', component: StructureSanteDetailComponent },
      { path: 'structures-sante/:id/edit', component: StructureSanteFormComponent },

      // ONGs routes
      { path: 'ongs', component: OngListComponent },
      { path: 'ongs/new', component: OngFormComponent },
      { path: 'ongs/:id', component: OngDetailComponent },
      { path: 'ongs/:id/edit', component: OngFormComponent },

      // Campagnes routes
      { path: 'campagnes', component: CampagneListComponent },
      { path: 'campagnes/new', component: CampagneFormComponent },
      { path: 'campagnes/:id', component: CampagneDetailComponent },
      { path: 'campagnes/:id/edit', component: CampagneFormComponent },

      // Messages routes
      { path: 'messages', component: MessageListComponent },
      { path: 'messages/new', component: MessageFormComponent },
      { path: 'messages/:id', component: MessageDetailComponent },
      { path: 'messages/:id/edit', component: MessageFormComponent },

      // Alertes routes
      { path: 'alertes', component: AlerteListComponent },
      { path: 'alertes/new', component: AlerteFormComponent },
      { path: 'alertes/:id', component: AlerteDetailComponent },
      { path: 'alertes/:id/edit', component: AlerteFormComponent },

      // Notifications routes
      { path: 'notifications', component: NotificationListComponent }
    ]
  },

  // Routes HPT indépendantes (si elles n'ont pas besoin du layout dashboard)
  { path: 'hpt', component: HptDashboardComponent },
  { path: 'hospitals', component: HptHospitalListComponent },
  { path: 'hospitals/:id', component: HptHospitalDetailComponent },
  { path: 'tickets', component: HptTicketListComponent },
  { path: 'tickets/create', component: HptTicketCreateComponent },

  // Redirections pour compatibilité
  { path: 'dashboard', redirectTo: '/admin/dashboard', pathMatch: 'full' },

  // Route par défaut - DOIT être en dernier
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Mettre à true pour debug
    useHash: false // Important pour le déploiement SPA
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
