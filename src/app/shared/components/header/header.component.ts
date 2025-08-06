import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: null
  };

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    // Implémenter la logique de déconnexion
    console.log('Logout');
  }
}
