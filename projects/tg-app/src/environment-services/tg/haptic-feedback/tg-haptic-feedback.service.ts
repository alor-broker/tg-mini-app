import { Inject, Injectable } from '@angular/core';
import { HapticFeedbackService, HapticStyle } from "@environment-services-lib";
import { HapticFeedback, TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";

@Injectable({
  providedIn: 'root'
})
export class TgHapticFeedbackService extends HapticFeedbackService {

  private hapticFeedbackCtx: HapticFeedback | null = null;

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    super();

    if (tgWebApp.isVersionAtLeast('6.1')) {
      this.hapticFeedbackCtx = tgWebApp.HapticFeedback;
    }
  }

  override impactOccurred(style: HapticStyle) {
    this.hapticFeedbackCtx?.impactOccurred(style);
  }
}
