import { TestBed } from '@angular/core/testing';

import { SelectedPortfolioDataContextService } from './selected-portfolio-data-context.service';

describe('SelectedPortfolioDataContextService', () => {
  let service: SelectedPortfolioDataContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPortfolioDataContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
