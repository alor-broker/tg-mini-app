import { TestBed } from '@angular/core/testing';

import { WatchedInvestmentIdeasService } from './watched-investment-ideas.service';
import { StorageServiceSpy } from "../../../testing-utils/storage-service-spy";

describe('WatchedInvestmentIdeasService', () => {
  let service: WatchedInvestmentIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageServiceSpy.getSpy().provider
      ]
    });
    service = TestBed.inject(WatchedInvestmentIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
