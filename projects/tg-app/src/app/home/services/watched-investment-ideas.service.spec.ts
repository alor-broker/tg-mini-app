import { TestBed } from '@angular/core/testing';

import { WatchedInvestmentIdeasService } from './watched-investment-ideas.service';

describe('InvestmentIdeasService', () => {
  let service: WatchedInvestmentIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchedInvestmentIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
