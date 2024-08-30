import {
  SpyProviderBase,
  TestSpy
} from "./spy-provider-base";
import { ApiConfigProvider } from "@api-lib";
import { of } from "rxjs";

export class ApiConfigProviderSpy extends SpyProviderBase<ApiConfigProvider> {
  protected createSpy(): TestSpy<ApiConfigProvider> {
    const spy = jasmine.createSpyObj<ApiConfigProvider>(
      ['getConfig']
    );

    spy.getConfig.and.returnValue(of({
      apiUrl: '',
      userDataUrl: '',
      superAppUrl: ''
    }))

    return {
      spy,
      provider: {
        provide: ApiConfigProvider,
        useValue: spy
      }
    }
  }

  static getSpy(): TestSpy<ApiConfigProvider> {
    return new ApiConfigProviderSpy().createSpy();
  }
}
