import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { ApiErrorsTracker } from "@api-lib";

export class ApiErrorsTrackerSpy extends SpyProviderBase<ApiErrorsTracker> {
  static getSpy(): TestSpy<ApiErrorsTracker> {
    return new ApiErrorsTrackerSpy().createSpy();
  }

  protected override createSpy<K>(): TestSpy<ApiErrorsTracker> {
    const spy = jasmine.createSpyObj<ApiErrorsTracker>(
      [
        'track'
      ]
    );

    return {
      spy,
      provider: {
        provide: ApiErrorsTracker,
        useValue: spy
      }
    }
  }
}
