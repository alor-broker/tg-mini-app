import { Provider } from "@angular/core";
import { ApiConfigProvider } from "@api-lib";
import { TgAppApiConfigProvider } from "../environment-services/api/tg-app-api-config-provider";
import { EnvironmentServicesProviders } from "../environment-services/tg/environment-services-providers";

export const ApplicationProviders: Provider[] = [
  ...EnvironmentServicesProviders,
  {
    provide: ApiConfigProvider,
    useClass: TgAppApiConfigProvider
  }
]
