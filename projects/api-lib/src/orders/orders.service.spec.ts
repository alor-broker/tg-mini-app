import { TestBed } from '@angular/core/testing';

import { OrdersService } from '@api-lib';
import { ApiConfigProviderSpy } from "../testing-utils/api-config-provider-spy";
import { ApiErrorsTrackerSpy } from "../testing-utils/api-errors-tracker-spy";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiConfigProviderSpy.getSpy().provider,
        ApiErrorsTrackerSpy.getSpy().provider,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
