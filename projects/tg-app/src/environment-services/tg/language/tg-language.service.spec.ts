import { TestBed } from '@angular/core/testing';

import { TgLanguageService } from './tg-language.service';

describe('TgLanguageService', () => {
  let service: TgLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
