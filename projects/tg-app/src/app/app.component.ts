import {
  Component,
  Inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TelegramWebApp,
  WebApp
} from "@m1cron-labs/ng-telegram-mini-app";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    this.tgWebApp.ready();
  }
}
