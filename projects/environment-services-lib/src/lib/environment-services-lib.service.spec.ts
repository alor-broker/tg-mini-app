import { TestBed } from '@angular/core/testing';

import { EnvironmentServicesLibService } from './environment-services-lib.service';

describe('EnvironmentServicesLibService', () => {
  let service: EnvironmentServicesLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentServicesLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
