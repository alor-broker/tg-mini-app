import { TestBed } from '@angular/core/testing';

import { PortfolioSummaryService } from './portfolio-summary.service';

describe('PortfolioSummaryService', () => {
  let service: PortfolioSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
