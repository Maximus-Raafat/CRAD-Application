import { INotification } from './INotification';

export class EmailNotification implements INotification {
  sendNotification(message: string, recipient: string): void {
    console.log(`Sending email to ${recipient}: ${message}`);
    // Add email sending logic here
  }
}