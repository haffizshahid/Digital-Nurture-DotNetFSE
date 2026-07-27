import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// Hands-On 6 Task 2 Step 67: Component-level providing
// Providing NotificationService at component level creates a new, separate instance scoped exclusively to this component tree.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Component-level provider creates isolated scoped service instance
  template: `
    <div class="notification-box">
      <h5>Notification Service (Scoped Instance #{{ notificationService.instanceId }})</h5>
      <button (click)="addTestNotification()" class="btn btn-secondary btn-sm">Trigger Notification</button>
      <ul>
        <li *ngFor="let note of notificationService.getNotifications()">{{ note }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .notification-box {
      background: rgba(245, 158, 11, 0.1);
      border: 1px dashed var(--warning-color);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin-top: 1rem;
      font-size: 0.85rem;
    }
    h5 { color: var(--warning-color); margin-bottom: 0.5rem; }
    ul { margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-muted); }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  addTestNotification(): void {
    this.notificationService.addNotification('Notification event dispatched at ' + new Date().toLocaleTimeString());
  }
}
