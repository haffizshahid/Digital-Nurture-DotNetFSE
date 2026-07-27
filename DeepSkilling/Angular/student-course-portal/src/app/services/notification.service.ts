import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  // Instance identifier to verify separate scoped instances when provided at component level
  public readonly instanceId: number = Math.floor(Math.random() * 10000);
  private notifications: string[] = [];

  addNotification(message: string): void {
    this.notifications.push(`[Instance #${this.instanceId}] ${message}`);
  }

  getNotifications(): string[] {
    return [...this.notifications];
  }
}
