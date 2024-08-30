import { TestBed } from '@angular/core/testing';

import { PortfolioPositionsService } from './portfolio-positions.service';
import { ApiConfigProviderSpy } from "../testing-utils/api-config-provider-spy";
import { ApiErrorsTrackerSpy } from "../testing-utils/api-errors-tracker-spy";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe('PortfolioPositionsService', () => {
  let service: PortfolioPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiConfigProviderSpy.getSpy().provider,
        ApiErrorsTrackerSpy.getSpy().provider,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PortfolioPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
