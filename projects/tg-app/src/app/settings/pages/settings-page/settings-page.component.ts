import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { BackButtonService, LinksService } from "@environment-services-lib";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { take } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { InvestmentIdeasComponent } from "../../../home/components/investment-ideas/investment-ideas.component";
import { OrderItemComponent } from "../../../home/components/order-item/order-item.component";
import { TradeItemComponent } from "../../../home/components/trade-item/trade-item.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { PasswordSettingsComponent } from "../../components/password-settings/password-settings.component";
import { NzDrawerComponent, NzDrawerContentDirective } from "ng-zorro-antd/drawer";

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
    NzTypographyComponent,
    AsyncPipe,
    InvestmentIdeasComponent,
    OrderItemComponent,
    TradeItemComponent,
    SectionsComponent,
    SectionPanelComponent,
    NzSwitchComponent,
    PasswordSettingsComponent,
    NzDrawerComponent,
    NzDrawerContentDirective
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.less'
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  isBackButtonAvailable = false;
  isPasswordSettingsOpened = false;

  settingsButtons: SettingsButton[][] = [
    [
      {
        icon: 'key',
        title: 'Код-пароль и биометрия',
        className: 'reset-password-icon',
        action: () => {
          this.backButtonService.offClick(this.onBackHome);
          this.router.navigate(
            [RoutesHelper.urlForRoot(RoutesHelper.appRoutes.authentication.unlock)],
            {
              queryParams: {
                redirectUrl: `${RoutesHelper.urlForRoot(RoutesHelper.appRoutes.settings)}`,
                redirectUrlParams: [],
                isCancellable: true
              }
            })
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
    private readonly route: ActivatedRoute,
    private readonly apiTokenProviderService: ApiTokenProviderService,
    private readonly linksService: LinksService,
    private readonly backButtonService: BackButtonService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        take(1)
      )
      .subscribe(params => {
        this.isPasswordSettingsOpened = params['checked'] ?? false;

        if (this.isPasswordSettingsOpened) {
          this.setBackSettingsBtn();
        } else {
          this.setBackHomeBtn();
        }

        this.cdr.detectChanges();
      })
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBackHome);
  }

  onBackHome = () => {
    this.backButtonService.hide();
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.home)
  }

  onBackSettings = () => {
    this.backButtonService.hide();
    this.backButtonService.offClick(this.onBackSettings);
    this.isPasswordSettingsOpened = false;
    this.setBackHomeBtn();
    this.cdr.detectChanges();
  }

  private setBackHomeBtn() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;

    if (this.isBackButtonAvailable) {
      this.backButtonService.onClick(this.onBackHome);
      this.backButtonService.show();
    }
  }

  private setBackSettingsBtn() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;

    if (this.isBackButtonAvailable) {
      this.backButtonService.onClick(this.onBackSettings);
      this.backButtonService.show();
    }
  }
}
