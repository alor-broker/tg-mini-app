import { TestBed } from '@angular/core/testing';

import { ApiLibService } from './api-lib.service';

describe('ApiLibService', () => {
  let service: ApiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
