import { HapticFeedbackService } from "@environment-services-lib";
import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";

export class HapticFeedbackServiceSpy extends SpyProviderBase<HapticFeedbackService> {
  static getSpy(): TestSpy<HapticFeedbackService> {
    return new HapticFeedbackServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<HapticFeedbackService> {
    const spy = jasmine.createSpyObj<HapticFeedbackService>(
      [
        'impactOccurred',
        'notificationOccurred'
      ]
    );

    spy.impactOccurred.and.callThrough();
    spy.notificationOccurred.and.callThrough();

    return {
      spy,
      provider: {
        provide: HapticFeedbackService,
        useValue: spy
      }
    }
  }
}
