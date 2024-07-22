import { Provider } from "@angular/core";
import { ThemingService } from "@environment-services-lib";
import { TgThemingService } from "./theming/tg-theming.service";

export const EnvironmentServicesProviders: Provider[] = [
  {
    provide: ThemingService,
    useClass: TgThemingService
  },
];
