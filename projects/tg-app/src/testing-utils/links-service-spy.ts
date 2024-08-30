import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { LinksService } from "@environment-services-lib";

export class LinksServiceSpy extends SpyProviderBase<LinksService> {
  static getSpy(): TestSpy<LinksService> {
    return new LinksServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<LinksService> {
    const spy = jasmine.createSpyObj<LinksService>(
      [
        'openBrowserLink',
        'openApplicationLink'
      ]
    );

    spy.openApplicationLink.and.callThrough();
    spy.openBrowserLink.and.callThrough();

    return {
      spy,
      provider: {
        provide: LinksService,
        useValue: spy
      }
    }
  }
}
