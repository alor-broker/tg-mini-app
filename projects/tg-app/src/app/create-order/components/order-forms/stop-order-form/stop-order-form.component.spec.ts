import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopOrderFormComponent } from './stop-order-form.component';
import { TranslocoTestModuleProvider } from "../../../../../testing-utils/transloco-test-module-provider";
import {
  MockComponent,
  MockProvider
} from "ng-mocks";
import { OrdersService } from "@api-lib";
import { SubmitOrderButtonsComponent } from "../../submit-order-buttons/submit-order-buttons.component";
import { SelectedPortfolioDataContextService } from "../../../../home/services/selected-portfolio-data-context.service";
import { Subject } from "rxjs";
import { CommonParametersService } from "../../../sevices/commom-parameters/common-parameters.service";
import { ModalServiceSpy } from "../../../../../testing-utils/modal-service-spy";
import { LinksServiceSpy } from "../../../../../testing-utils/links-service-spy";

describe('StopOrderFormComponent', () => {
  let component: StopOrderFormComponent;
  let fixture: ComponentFixture<StopOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslocoTestModuleProvider.getModule(),
        StopOrderFormComponent,
        MockComponent(SubmitOrderButtonsComponent)
      ],
      providers: [
        MockProvider(OrdersService),
        MockProvider(
          SelectedPortfolioDataContextService,
          {
            selectedPortfolio$: new Subject()
          }
        ),
        MockProvider(
          CommonParametersService,
          {
            parameters$: new Subject()
          }
        ),
        ModalServiceSpy.getSpy().provider,
        LinksServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
