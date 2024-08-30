import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { PlatformInfoService } from "@environment-services-lib";

export class PlatformInfoServiceSpy extends SpyProviderBase<PlatformInfoService> {
  static getSpy(): TestSpy<PlatformInfoService> {
    return new PlatformInfoServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<PlatformInfoService> {
    const spy = jasmine.createSpyObj<PlatformInfoService>(['isDesktopPlatform']);

    spy.isDesktopPlatform.and.returnValue(true);

    return {
      spy,
      provider: {
        provide: PlatformInfoService,
        useValue: spy
      }
    };
  }
}
