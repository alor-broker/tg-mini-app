import { TestBed } from '@angular/core/testing';

import { TradesHistoryService } from './trades-history.service';

describe('TradesHistoryService', () => {
  let service: TradesHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradesHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
