import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeItemComponent } from './trade-item.component';

describe('TradeItemComponent', () => {
  let component: TradeItemComponent;
  let fixture: ComponentFixture<TradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
