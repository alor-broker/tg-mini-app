import { Inject, Injectable } from '@angular/core';
import { TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";
import { Observable } from "rxjs";
import { ModalService } from "@environment-services-lib";

@Injectable({
  providedIn: 'root'
})
export class TgModalService extends ModalService {

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    super();
  }

  override showMessage(message: string, title?: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.tgWebApp.showPopup({
        title,
        message,
        buttons: [{ text: 'ОК' }]
      }, () => {
        subscriber.next();
        subscriber.complete();
      });
    })
  }
}
