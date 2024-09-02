import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { OrderItemComponent } from './order-item.component';
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { PortfolioOrder } from "@api-lib";
import { MockProvider } from "ng-mocks";
import { BackButtonService } from "@environment-services-lib";

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderItemComponent,
        TranslocoTestModuleProvider.getModule()
      ],
      providers: [
        MockProvider(BackButtonService)
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
    component.order = {} as PortfolioOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
