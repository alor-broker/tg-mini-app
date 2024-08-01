import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';
import { ApplicationProviders } from './application-providers'

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApiTokenInterceptor } from "./core/interceptors/api-token-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    provideAnimations(),
    //-----
    ApplicationProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true
    },
  ]
};
