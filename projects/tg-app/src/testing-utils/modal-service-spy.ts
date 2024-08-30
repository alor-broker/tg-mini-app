import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { ModalService } from "@environment-services-lib";

export class ModalServiceSpy extends SpyProviderBase<ModalService> {
  static getSpy(): TestSpy<ModalService> {
    return new ModalServiceSpy().createSpy();
  }

  protected override createSpy(): TestSpy<ModalService> {
    const spy = jasmine.createSpyObj<ModalService>(
      ['showMessage']
    );
    spy.showMessage.and.callThrough();

    return {
      spy,
      provider: {
        provide: ModalService,
        useValue: spy
      }
    };
  }

}
