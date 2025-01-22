import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Core/Services/NotifactionService/Notifaction';
import { EmailNotification } from '../../../Core/InterFaces/EmailNotification';
import { SMSNotification } from '../../../Core/InterFaces/SMSNotification';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
SMSEmail!:boolean;
sMS!:boolean;
email!:boolean;

visibleTask: any;
ngOnInit(): void {
  this.initialForm()
}
onSubmit() {
throw new Error('Method not implemented.');
}
formGroupSend!: FormGroup<any>;
showDialog() {
  this.visibleTask = true;
}
  notifications: string[] = [];

  constructor(private notfiactionService:NotificationService){}

  sendEmailSmSNotification():void {
    if (!this.SMSEmail) {
      this.notfiactionService.setNotificationMethod(new SMSNotification());
      this.notfiactionService.send(this.formGroupSend.value.message, this.formGroupSend.value.sendTo);
      this.notifications.push('SMS sent to '+ this.formGroupSend.value.sendTo +' : ' + this.formGroupSend.value.message);

    } else {
      this.notfiactionService.setNotificationMethod(new EmailNotification());
      this.notfiactionService.send(this.formGroupSend.value.message, this.formGroupSend.value.sendTo);
      this.notifications.push('Email sent to '+ this.formGroupSend.value.sendTo +' : ' + this.formGroupSend.value.message);

    }
    this.formGroupSend.reset();
    this.visibleTask = false;
    
  }
 
  initialForm():void{
    this.formGroupSend = new FormGroup({
      sendTo:new FormControl('',[Validators.required]),
      message:new FormControl('',[Validators.required]),
    })
  }
}
