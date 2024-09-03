import { Inject, Injectable } from '@angular/core';
import { TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";
import { Observable } from "rxjs";
import { ModalParams, ModalService } from "@environment-services-lib";

@Injectable()
export class TgModalService extends ModalService {

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    super();
  }

  override showMessage(params: ModalParams): Observable<string> {
    return new Observable<string>(subscriber => {
      this.tgWebApp.showPopup({
        ...params,
        buttons: (params.buttons?.length ?? 0 > 0) ? params.buttons : [{ text: 'OK' }]
      }, (buttonId?: string) => {
        subscriber.next(buttonId);
        subscriber.complete();
      });
    })
  }
}
