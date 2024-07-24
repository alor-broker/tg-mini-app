import { Inject, Injectable } from '@angular/core';
import { BiometryService } from "@environment-services-lib";
import { Observable, of, switchMap } from "rxjs";
import { BiometricManager, TelegramWebApp, WebApp } from "@m1cron-labs/ng-telegram-mini-app";

@Injectable()
export class TgBiometryService extends BiometryService {

  private readonly unavailablePlatforms = ['windows', 'macos'];
  private readonly biometricManager: BiometricManager | null = null;

  constructor(
    @Inject(TelegramWebApp) private readonly tgWebApp: WebApp
  ) {
    super();

    if (
      tgWebApp.isVersionAtLeast('7.2') &&
      !this.unavailablePlatforms.includes(tgWebApp.platform)
    ) {
      this.biometricManager = tgWebApp.BiometricManager;
    }
  }

  override isBiometryAvailable(): Observable<boolean> {
    if (this.biometricManager == null) {
      return of(false);
    }

    return this.callWithInit<boolean>(() => {
      return of(this.biometricManager!.isBiometricAvailable);
    })
  }

  override requestAccess(reason:string): Observable<boolean> {
    return this.callWithInit<boolean>(() => {
      return new Observable<boolean>(subscriber => {
        this.biometricManager!.requestAccess( { reason }, (isGranted: boolean) => {
          subscriber.next(isGranted);
          subscriber.complete();
        });
      })
    });
  }

  override authenticate(reason: string): Observable<boolean> {
    return this.callWithInit<boolean>(() => {
      return new Observable<boolean>(subscriber => {
        this.biometricManager!.authenticate( { reason }, (isAuthenticated: boolean) => {
          subscriber.next(isAuthenticated);
          subscriber.complete();
        });
      })
    });
  }

  private callWithInit<T>(cb: () => Observable<T>): Observable<T> {
    return new Observable<T>(subscriber => {
      const initCb = () => {
        subscriber.next();
        subscriber.complete();
      }

      if (this.biometricManager!.isInited) {
        initCb();
      } else {
        this.biometricManager!.init(initCb);
      }
    })
      .pipe(
        switchMap(cb)
      )
  }
}
