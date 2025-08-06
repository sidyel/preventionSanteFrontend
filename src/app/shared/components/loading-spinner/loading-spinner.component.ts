import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'white' = 'primary';
  getClasses(): string {
    let classes = '';

    // Size
    switch (this.size) {
      case 'sm':
        classes += 'w-4 h-4 ';
        break;
      case 'md':
        classes += 'w-6 h-6 ';
        break;
      case 'lg':
        classes += 'w-8 h-8 ';
        break;
    }

    // Color
    switch (this.color) {
      case 'primary':
        classes += 'border-primary-500 border-t-primary-500';
        break;
      case 'white':
        classes += 'border-white border-t-white';
        break;
    }

    return classes;
  }
}
