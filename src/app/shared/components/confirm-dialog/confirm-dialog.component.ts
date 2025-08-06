import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmation';
  @Input() message = 'Êtes-vous sûr de vouloir continuer ?';
  @Input() confirmText = 'Confirmer';
  @Input() cancelText = 'Annuler';
  @Input() type: 'danger' | 'warning' | 'info' = 'info';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
  getIconClasses(): string {
    switch (this.type) {
      case 'danger':
        return 'bg-danger-100 text-danger-600';
      case 'warning':
        return 'bg-warning-100 text-warning-600';
      case 'info':
      default:
        return 'bg-primary-100 text-primary-600';
    }
  }

  getConfirmButtonClasses(): string {
    switch (this.type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
      default:
        return 'btn-primary';
    }
  }
}
