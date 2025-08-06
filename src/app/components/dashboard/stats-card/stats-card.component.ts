import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() icon!: string;
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary';
  @Input() trend?: { value: number; isPositive: boolean };

  getIconClasses(): string {
    const baseClasses = 'w-8 h-8 ';
    switch (this.color) {
      case 'primary':
        return baseClasses + 'text-primary-600';
      case 'success':
        return baseClasses + 'text-success-600';
      case 'warning':
        return baseClasses + 'text-warning-600';
      case 'danger':
        return baseClasses + 'text-danger-600';
      case 'info':
      default:
        return baseClasses + 'text-blue-600';
    }
  }

  getBackgroundClasses(): string {
    switch (this.color) {
      case 'primary':
        return 'bg-primary-100';
      case 'success':
        return 'bg-success-100';
      case 'warning':
        return 'bg-warning-100';
      case 'danger':
        return 'bg-danger-100';
      case 'info':
      default:
        return 'bg-blue-100';
    }
  }
}
