import { Injectable } from '@angular/core';
import { INotification } from '../../InterFaces/INotification';


@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationMethod!: INotification;
  
    setNotificationMethod(method: INotification): void {
      this.notificationMethod = method;
    }
  
    send(message: string, recipient: string): void {
      if (!this.notificationMethod) {
        throw new Error('Notification method is not set.');
      }
      this.notificationMethod.sendNotification(message, recipient);
    }
  }