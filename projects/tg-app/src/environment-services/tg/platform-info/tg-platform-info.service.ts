import { Inject, Injectable } from '@angular/core';
import { PlatformInfoService } from "../../../../../environment-services-lib/src/platform-info/platform-info.service";
import { TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";

@Injectable({
  providedIn: 'root'
})
export class TgPlatformInfoService extends PlatformInfoService {

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    super();
  }

  override getPlatformName(): string {
    return this.tgWebApp.platform;
  }
}
