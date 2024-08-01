import { Provider } from "@angular/core";
import {
  ThemingService,
  StorageService,
  BiometryService,
  BackButtonService,
  LinksService
} from "@environment-services-lib";
import { TgThemingService } from "./theming/tg-theming.service";
import { TgStorageService } from "./storage/tg-storage.service";
import { TgBiometryService } from "./biometry/tg-biometry.service";
import { TgBackButtonService } from "./back-button/tg-back-button.service";
import { TgLinksService } from "./links/tg-links.service";

export const EnvironmentServicesProviders: Provider[] = [
  {
    provide: ThemingService,
    useClass: TgThemingService
  },
  {
    provide: StorageService,
    useClass: TgStorageService
  },
  {
    provide: BiometryService,
    useClass: TgBiometryService
  },
  {
    provide: BackButtonService,
    useClass: TgBackButtonService
  },
  {
    provide: LinksService,
    useClass: TgLinksService
  }
];
