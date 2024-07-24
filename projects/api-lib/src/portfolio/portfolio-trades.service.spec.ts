import { TestBed } from '@angular/core/testing';

import { PortfolioTradesService } from './portfolio-trades.service';

describe('PortfolioTradesService', () => {
  let service: PortfolioTradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioTradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
