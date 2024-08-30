import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { StorageService } from "@environment-services-lib";
import { Subject } from "rxjs";

export class StorageServiceSpy extends SpyProviderBase<StorageService> {
  static getSpy(): TestSpy<StorageService> {
    return new StorageServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<StorageService> {
    const spy = jasmine.createSpyObj<StorageService>(
      [
        'getItem',
        'setItem',
        'removeItem'
      ]
    );

    spy.getItem.and.returnValue(new Subject());
    spy.setItem.and.callThrough();
    spy.removeItem.and.callThrough();

    return {
      spy,
      provider: {
        provide: StorageService,
        useValue: spy
      }
    };
  }
}
