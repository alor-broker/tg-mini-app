import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { BackButtonService, LinksService } from "@environment-services-lib";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { Router } from "@angular/router";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";
import { RoutesHelper } from "../../../core/utils/routes.helper";

interface SettingsButton {
  icon: string;
  className: string;
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
    NzTypographyComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.less'
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  isBackButtonAvailable = false;

  settingsButtons: SettingsButton[][] = [
    [
      {
        icon: 'key',
        title: 'Сбросить код-пароль',
        className: 'reset-password-icon',
        action: () => {
          this.backButtonService.hide();
          RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword)
        }
      },
    ],
    [
      {
        icon: 'notification',
        title: 'Телеграм АЛОР',
        className: 'alor-tg-icon',
        action: () => {
          this.linksService.openApplicationLink('https://t.me/alorbroker')
        }
      },
      {
        icon: 'message',
        title: 'Поддержка',
        className: 'support-icon',
        action: () => {
          this.linksService.openApplicationLink('https://t.me/alor_broker')
        },
      }
    ],
    [
      {
        icon: 'logout',
        title: 'Выйти',
        className: 'logout-icon',
        type: 'danger',
        action: () => {
          this.apiTokenProviderService.logout();
        },
      }
    ]
  ];

  constructor(
    private readonly router: Router,
    private readonly apiTokenProviderService: ApiTokenProviderService,
    private readonly linksService: LinksService,
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
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.home)
  }
}
