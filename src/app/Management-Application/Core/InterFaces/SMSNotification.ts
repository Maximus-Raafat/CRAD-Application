import { INotification } from './INotification';

export class SMSNotification implements INotification {
  sendNotification(message: string, recipient: string): void {
    console.log(`Sending email to ${recipient}: ${message}`);
    // Add email sending logic here
  }
}
