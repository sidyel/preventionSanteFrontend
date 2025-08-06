import { Component, Input, Output, EventEmitter } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'home',
      route: '/dashboard'
    },
    {
      label: 'Utilisateurs',
      icon: 'users',
      route: '/users'
    },
    {
      label: 'Structures de Santé',
      icon: 'building',
      route: '/structures-sante'
    },
    {
      label: 'ONGs',
      icon: 'heart',
      route: '/ongs'
    },
    {
      label: 'Population Rurale',
      icon: 'users',
      route: '/population-rurale'
    },
    {
      label: 'Campagnes',
      icon: 'megaphone',
      route: '/campagnes'
    },
    {
      label: 'Messages',
      icon: 'mail',
      route: '/messages'
    },
    {
      label: 'Alertes',
      icon: 'alert-triangle',
      route: '/alertes'
    },
    {
      label: 'Notifications',
      icon: 'bell',
      route: '/notifications'
    }
  ];

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
