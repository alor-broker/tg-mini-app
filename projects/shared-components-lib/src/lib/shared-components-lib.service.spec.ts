import { TestBed } from '@angular/core/testing';

import { SharedComponentsLibService } from './shared-components-lib.service';

describe('SharedComponentsLibService', () => {
  let service: SharedComponentsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedComponentsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
