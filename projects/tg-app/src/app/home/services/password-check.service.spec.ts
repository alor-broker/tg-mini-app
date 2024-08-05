import { TestBed } from '@angular/core/testing';

import { PasswordCheckService } from './password-check.service';

describe('PasswordCheckService', () => {
  let service: PasswordCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
