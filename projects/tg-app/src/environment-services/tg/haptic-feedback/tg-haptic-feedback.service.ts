import { Inject, Injectable } from '@angular/core';
import { HapticFeedbackService, ImpactHapticStyle } from "@environment-services-lib";
import { HapticFeedback, NotificationType, TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";

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

  override impactOccurred(style: ImpactHapticStyle) {
    this.hapticFeedbackCtx?.impactOccurred(style);
  }

  override notificationOccurred(style: NotificationType) {
    this.hapticFeedbackCtx?.notificationOccurred(style);
  }
}
