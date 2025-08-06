import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hpt-header',
  template: `
    <header class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-hpt-primary cursor-pointer"
                  (click)="navigateTo('/')">
                🏥 Sante Sur Scene- Hopital
              </h1>
            </div>
            <nav class="hidden md:ml-10 md:flex md:space-x-8">
              <a (click)="navigateTo('/hospitals')"
                 class="text-gray-900 hover:text-hpt-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Hôpitaux
              </a>
              <a (click)="navigateTo('/services')"
                 class="text-gray-900 hover:text-hpt-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Services
              </a>
              <a (click)="navigateTo('/tickets')"
                 class="text-gray-900 hover:text-hpt-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Mes Tickets
              </a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <button (click)="navigateTo('/tickets/create')"
                    class="hpt-btn hpt-btn-primary">
              📋 Nouveau Ticket
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HptHeaderComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
