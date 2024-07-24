import { Provider } from "@angular/core";
import { ThemingService, StorageService, BiometryService } from "@environment-services-lib";
import { TgThemingService } from "./theming/tg-theming.service";
import { TgStorageService } from "./storage/tg-storage.service";
import { TgBiometryService } from "./biometry/tg-biometry.service";

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
  }
];
