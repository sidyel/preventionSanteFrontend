import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hpt-loading',
  template: `
    <div class="flex justify-center items-center" [ngClass]="containerClass">
      <div class="animate-spin rounded-full border-4 border-gray-200 border-t-hpt-primary"
           [ngClass]="spinnerSize">
      </div>
      <span *ngIf="message" class="ml-3 text-gray-600">{{ message }}</span>
    </div>
  `
})
export class HptLoadingComponent {
  @Input() message: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() containerClass: string = 'py-8';

  get spinnerSize(): string {
    switch (this.size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-12 w-12';
      default: return 'h-8 w-8';
    }
  }
}
