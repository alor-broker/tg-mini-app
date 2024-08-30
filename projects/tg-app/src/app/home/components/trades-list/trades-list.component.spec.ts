import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TradesListComponent } from "./trades-list.component";
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import { Subject } from "rxjs";
import { PortfolioTradesService } from "@api-lib";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { InstrumentIconSourceServiceSpy } from "../../../core/services/instrument-icon-source.service.spy";

describe('TradesListComponent', () => {
  let component: TradesListComponent;
  let fixture: ComponentFixture<TradesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TradesListComponent,
        TranslocoTestModuleProvider.getModule()
      ],
      providers: [
        {
          provide: SelectedPortfolioDataContextService,
          useValue: {
            selectedPortfolio$: new Subject()
          }
        },
        {
          provide: PortfolioTradesService,
          useValue: {
            getSessionTrades: jasmine.createSpy('getSessionTrades').and.returnValue(new Subject())
          }
        },
        InstrumentIconSourceServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
