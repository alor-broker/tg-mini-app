import { TestBed } from '@angular/core/testing';

import { PortfolioSummaryService } from './portfolio-summary.service';
import { ApiConfigProviderSpy } from "../testing-utils/api-config-provider-spy";
import { ApiErrorsTrackerSpy } from "../testing-utils/api-errors-tracker-spy";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe('PortfolioSummaryService', () => {
  let service: PortfolioSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiConfigProviderSpy.getSpy().provider,
        ApiErrorsTrackerSpy.getSpy().provider,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PortfolioSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
