import { Component } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {
  // Navigation items
  navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'Hôpitaux', href: 'hpt' },
    { label: 'Dashboard', href: 'dashboard' },
    { label: 'Contact', href: 'contact' }
  ];

  // Acteurs data
  acteurs = [
    {
      title: 'Structures de Santé',
      description: 'Hôpitaux, cliniques et centres de santé qui diffusent des informations médicales et des alertes sanitaires aux populations.',
      icon: 'building',
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ONG',
      description: 'Organisations non gouvernementales qui mènent des campagnes de sensibilisation et d\'éducation sanitaire.',
      icon: 'users',
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'bg-green-600',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Population Rurale',
      description: 'Communautés rurales bénéficiant des services de santé, alertes et programmes de prévention.',
      icon: 'heart',
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-600',
      image: 'https://images.unsplash.com/photo-1594736797933-d0600ba52719?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Services data
  services = [
    {
      title: 'Alertes Sanitaires',
      description: 'Diffusion rapide d\'alertes et de messages de prévention aux populations rurales.',
      icon: 'bell',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Localisation Hôpitaux',
      description: 'Trouvez facilement les hôpitaux et centres de santé près de chez vous.',
      icon: 'map-pin',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Réservation Services',
      description: 'Réservez et achetez vos tickets pour les examens médicaux en ligne.',
      icon: 'calendar',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Paiement Sécurisé',
      description: 'Système de paiement sécurisé pour tous vos services de santé.',
      icon: 'credit-card',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Informations Médicales',
      description: 'Accédez aux informations sur les services, horaires et tarifs des hôpitaux.',
      icon: 'stethoscope',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Prévention',
      description: 'Programmes de sensibilisation et de prévention adaptés aux besoins locaux.',
      icon: 'shield',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  ];

  // Footer links
  footerLinks = {
    services: [
      { label: 'Alertes Sanitaires', href: '#' },
      { label: 'Réservation', href: '#' },
      { label: 'Hôpitaux', href: '#' },
      { label: 'Prévention', href: '#' }
    ],
    acteurs: [
      { label: 'Structures de Santé', href: '#' },
      { label: 'ONG', href: '#' },
      { label: 'Population Rurale', href: '#' },
      { label: 'Partenaires', href: '#' }
    ]
  };

  constructor() { }

  // Methods
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onExploreServices(): void {
    this.scrollToSection('services');
  }

  onLearnMore(): void {
    // Implement learn more functionality
    console.log('Learn more clicked');
  }

  onLogin(): void {
    // Implement login functionality
    console.log('Login clicked');
  }

  onRegisterStructure(): void {
    // Implement structure registration
    console.log('Structure registration clicked');
  }

  onRegisterONG(): void {
    // Implement ONG registration
    console.log('ONG registration clicked');
  }

}
