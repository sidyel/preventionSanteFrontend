import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layouts


// Shared Components
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

// Dashboard Components
import { StatsCardComponent } from './components/dashboard/stats-card/stats-card.component';

// User Components
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';

// Structure Santé Components
import { StructureSanteListComponent } from './components/structures-sante/structure-sante-list/structure-sante-list.component';
import { StructureSanteFormComponent } from './components/structures-sante/structure-sante-form/structure-sante-form.component';
import { StructureSanteDetailComponent } from './components/structures-sante/structure-sante-detail/structure-sante-detail.component';

// ONG Components
import { OngListComponent } from './components/ongs/ong-list/ong-list.component';
import { OngFormComponent } from './components/ongs/ong-form/ong-form.component';
import { OngDetailComponent } from './components/ongs/ong-detail/ong-detail.component';


// Campagne Components
import { CampagneListComponent } from './components/campagnes/campagne-list/campagne-list.component';
import { CampagneFormComponent } from './components/campagnes/campagne-form/campagne-form.component';
import { CampagneDetailComponent } from './components/campagnes/campagne-detail/campagne-detail.component';

// Message Components
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { MessageFormComponent } from './components/messages/message-form/message-form.component';
import { MessageDetailComponent } from './components/messages/message-detail/message-detail.component';

// Alerte Components
import { AlerteListComponent } from './components/alertes/alerte-list/alerte-list.component';
import { AlerteFormComponent } from './components/alertes/alerte-form/alerte-form.component';
import { AlerteDetailComponent } from './components/alertes/alerte-detail/alerte-detail.component';

// Notification Components
import { NotificationListComponent } from './components/notifications/notification-list/notification-list.component';

// Auth Components
import { LoginComponent } from './components/auth/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard/dashboard.component";
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HptHeaderComponent } from './shared/components/hpt-header/hpt-header.component';
import { HptLoadingComponent } from './shared/components/hpt-loading/hpt-loading.component';
import { HptDashboardComponent } from './features/hpt-dashboard/hpt-dashboard.component';
import { HptHospitalListComponent } from './features/hpt-hospitals/hpt-hospital-list/hpt-hospital-list.component';
import { HptHospitalDetailComponent } from './features/hpt-hospitals/hpt-hospital-detail/hpt-hospital-detail.component';
import { HptTicketCreateComponent } from './features/hpt-tickets/hpt-ticket-create/hpt-ticket-create.component';
import { HptTicketListComponent } from './features/hpt-tickets/hpt-ticket-list/hpt-ticket-list.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

@NgModule({
  declarations: [
    AppComponent,
    // Layouts

    // Shared
    SidebarComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    // Dashboard
    DashboardComponent,
    StatsCardComponent,
    // Users
    UserListComponent,
    UserFormComponent,
    UserDetailComponent,
    // Structures Santé
    StructureSanteListComponent,
    StructureSanteFormComponent,
    StructureSanteDetailComponent,
    // ONGs
    OngListComponent,
    OngFormComponent,
    OngDetailComponent,

    // Campagnes
    CampagneListComponent,
    CampagneFormComponent,
    CampagneDetailComponent,
    // Messages
    MessageListComponent,
    MessageFormComponent,
    MessageDetailComponent,
    // Alertes
    AlerteListComponent,
    AlerteFormComponent,
    AlerteDetailComponent,
    // Notifications
    NotificationListComponent,
    // Auth
    LoginComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    HptHeaderComponent,
    HptLoadingComponent,
    HptDashboardComponent,
    HptHospitalListComponent,
    HptHospitalDetailComponent,
    HptTicketCreateComponent,
    HptTicketListComponent,
    AcceuilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
