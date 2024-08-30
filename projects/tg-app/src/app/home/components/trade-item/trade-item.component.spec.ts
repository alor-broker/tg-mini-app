import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeItemComponent } from './trade-item.component';
import { BackButtonServiceSpy } from "../../../../testing-utils/back-button-service-spy";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { PortfolioTrade } from "@api-lib";

describe('TradeItemComponent', () => {
  let component: TradeItemComponent;
  let fixture: ComponentFixture<TradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslocoTestModuleProvider.getModule(),
        TradeItemComponent
      ],
      providers: [
        BackButtonServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeItemComponent);
    component = fixture.componentInstance;
    component.trade = {} as PortfolioTrade;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
