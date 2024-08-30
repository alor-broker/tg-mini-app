import { Provider } from "@angular/core";

export interface TestSpy<T> {
  provider: Provider;
  spy: jasmine.SpyObj<T>;
}

export abstract class SpyProviderBase<T> {
  protected abstract createSpy():TestSpy<T>;
}
