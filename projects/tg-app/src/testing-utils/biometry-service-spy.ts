import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { BiometryService } from "@environment-services-lib";
import { of } from "rxjs";

export class BiometryServiceSpy extends SpyProviderBase<BiometryService> {
  static getSpy(): TestSpy<BiometryService> {
    return new BiometryServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<BiometryService> {
    const spy = jasmine.createSpyObj<BiometryService>(
      [
        'isBiometryAvailable',
        'requestAccess',
        'authenticate'
      ]
    );

    spy.isBiometryAvailable.and.returnValue(of(true));
    spy.requestAccess.and.returnValue(of(true));
    spy.authenticate.and.returnValue(of(true))

    return {
      spy,
      provider: {
        provide: BiometryService,
        useValue: spy
      }
    };
  }
}
