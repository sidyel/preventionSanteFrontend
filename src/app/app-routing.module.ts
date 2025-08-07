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
  // Page d'accueil publique (sans sidebar)
  { path: '', component: AcceuilComponent },

  // Routes d'authentification (sans sidebar)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

  // Routes HPT indépendantes (sans sidebar)
  { path: 'hpt', component: HptDashboardComponent },
  { path: 'hospitals', component: HptHospitalListComponent },
  { path: 'hospitals/:id', component: HptHospitalDetailComponent },
  { path: 'tickets', component: HptTicketListComponent },
  { path: 'tickets/create', component: HptTicketCreateComponent },

  // ==================== ROUTES AVEC SIDEBAR ====================
  // Toutes ces routes utilisent DashboardLayoutComponent (avec sidebar)

  // Dashboard
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  // Users avec sidebar
  {
    path: 'users',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: UserFormComponent },
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserFormComponent }
    ]
  },

  // Structures Santé avec sidebar
  {
    path: 'structures-sante',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: StructureSanteListComponent },
      { path: 'new', component: StructureSanteFormComponent },
      { path: ':id', component: StructureSanteDetailComponent },
      { path: ':id/edit', component: StructureSanteFormComponent }
    ]
  },

  // ONGs avec sidebar
  {
    path: 'ongs',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: OngListComponent },
      { path: 'new', component: OngFormComponent },
      { path: ':id', component: OngDetailComponent },
      { path: ':id/edit', component: OngFormComponent }
    ]
  },

  // Campagnes avec sidebar
  {
    path: 'campagnes',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: CampagneListComponent },
      { path: 'new', component: CampagneFormComponent },
      { path: ':id', component: CampagneDetailComponent },
      { path: ':id/edit', component: CampagneFormComponent }
    ]
  },

  // Messages avec sidebar
  {
    path: 'messages',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MessageListComponent },
      { path: 'new', component: MessageFormComponent },
      { path: ':id', component: MessageDetailComponent },
      { path: ':id/edit', component: MessageFormComponent }
    ]
  },

  // Alertes avec sidebar
  {
    path: 'alertes',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AlerteListComponent },
      { path: 'new', component: AlerteFormComponent },
      { path: ':id', component: AlerteDetailComponent },
      { path: ':id/edit', component: AlerteFormComponent }
    ]
  },

  // Notifications avec sidebar
  {
    path: 'notifications',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: NotificationListComponent }
    ]
  },

  // Route par défaut pour les URLs non reconnues
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Mettez à true pour debugger si nécessaire
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
