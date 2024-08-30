import { SpyProviderBase, TestSpy } from "./spy-provider-base";
import { BackButtonService } from "@environment-services-lib";

export class BackButtonServiceSpy extends SpyProviderBase<BackButtonService> {
    protected override createSpy(): TestSpy<BackButtonService> {
      const spy = jasmine.createSpyObj<BackButtonService>(
        [
          'show',
          'hide',
          'onClick',
          'offClick',
          'isAvailable',
          'isVisible'
        ]
      );

      return {
        spy,
        provider: {
          provide: BackButtonService,
          useValue: spy
        }
      }
    }

    static getSpy(): TestSpy<BackButtonService> {
      return new BackButtonServiceSpy().createSpy();
    }
}
