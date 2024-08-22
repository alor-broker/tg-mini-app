import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOrderFormComponent } from './market-order-form.component';

describe('MarketOrderFormComponent', () => {
  let component: MarketOrderFormComponent;
  let fixture: ComponentFixture<MarketOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
