import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import {
    NzListComponent,
    NzListItemComponent
} from "ng-zorro-antd/list";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { Router } from "@angular/router";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";
import {
  TelegramWebApp,
  WebApp
} from "@m1cron-labs/ng-telegram-mini-app";
import { BackButtonService } from "@environment-services-lib";

interface SettingsButton {
  icon: string;
  bgColor: string;
  title: string;
  type?: 'secondary' | 'warning' | 'danger' | 'success';
  action: () => void;
}

@Component({
  selector: 'tga-settings-page',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzIconDirective,
        NzListComponent,
        NzListItemComponent,
        NzTypographyComponent
    ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.less'
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  isBackButtonAvailable = false;

  settingsButtons: SettingsButton[] = [
    {
      icon: 'key',
      title: 'Сбросить код-пароль',
      bgColor: 'rgb(142, 142, 148)',
      action: () => {
        this.router.navigate(['/password-create'])
      }
    },
    {
      icon: 'notification',
      title: 'Телеграм АЛОР',
      bgColor: 'rgb(50, 173, 231)',
      action: () => {
        this.tgWebApp.openTelegramLink('https://t.me/alorbroker')
      }
    },
    {
      icon: 'message',
      title: 'Поддержка',
      bgColor: 'rgb(255, 149, 1)',
      action: () => {
        this.tgWebApp.openTelegramLink('https://t.me/alor_broker')
      },
    },
    {
      icon: 'logout',
      title: 'Выйти',
      bgColor: 'rgb(224,20,20)',
      type: 'danger',
      action: () => {
        this.apiTokenProviderService.logout();
      },
    }
  ];

  constructor(
    private readonly router: Router,
    private readonly apiTokenProviderService: ApiTokenProviderService,
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp,
    private readonly backButtonService: BackButtonService
  ) {
  }

  ngOnInit() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;

    if (this.isBackButtonAvailable) {
      this.backButtonService.onClick(this.onBack);
      this.backButtonService.show();
    }
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBack);
  }

  onBack = () => {
    this.backButtonService.hide();
    this.router.navigate(['/home'])
  }
}
