import { TestBed } from '@angular/core/testing';

import { OrderCommandService } from './order-command.service';

describe('OrderCommandService', () => {
  let service: OrderCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
