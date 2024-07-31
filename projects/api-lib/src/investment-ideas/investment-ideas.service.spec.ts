import { TestBed } from '@angular/core/testing';

import { InvestmentIdeasService } from './investment-ideas.service';

describe('InvestingIdeasService', () => {
  let service: InvestmentIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
