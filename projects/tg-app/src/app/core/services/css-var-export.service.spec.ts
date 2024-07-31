import { TestBed } from '@angular/core/testing';

import { CssVarExportService } from './css-var-export.service';

describe('CssVarExportService', () => {
  let service: CssVarExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssVarExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
