import { TestBed } from '@angular/core/testing';

import { PortfolioOrdersService } from './portfolio-orders.service';

describe('PortfolioOrdersService', () => {
  let service: PortfolioOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
