import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  public notify(type: NotificationType, message: string) : void{
    this.notifier.notify(type, message);
  }

}
