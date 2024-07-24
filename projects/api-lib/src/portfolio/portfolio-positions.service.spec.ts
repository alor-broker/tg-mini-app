import { TestBed } from '@angular/core/testing';

import { PortfolioPositionsService } from './portfolio-positions.service';

describe('PortfolioPositionsService', () => {
  let service: PortfolioPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
