import {
  SpyProviderBase,
  TestSpy
} from "../../../testing-utils/spy-provider-base";
import { InstrumentIconSourceService } from "./instrument-icon-source.service";

export class InstrumentIconSourceServiceSpy extends SpyProviderBase<InstrumentIconSourceService> {
  protected override createSpy(): TestSpy<InstrumentIconSourceService> {
    const spy = jasmine.createSpyObj<InstrumentIconSourceService>(['getIconUrl']);

    spy.getIconUrl.and.returnValue('');

    return {
      spy,
      provider: {
        provide: InstrumentIconSourceService,
        useValue: spy
      }
    };
  }

  static getSpy(): TestSpy<InstrumentIconSourceService> {
    return new InstrumentIconSourceServiceSpy().createSpy();
  }
}
