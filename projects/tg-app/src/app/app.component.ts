import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TelegramWebApp,
  WebApp
} from "@m1cron-labs/ng-telegram-mini-app";
import { CssVarExportService } from "./core/services/css-var-export.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(TelegramWebApp)
    private readonly tgWebApp: WebApp,
    private readonly cssVarExportService: CssVarExportService
  ) {
    this.tgWebApp.ready();
  }

  ngOnInit(): void {
    this.cssVarExportService.export();
  }
}
