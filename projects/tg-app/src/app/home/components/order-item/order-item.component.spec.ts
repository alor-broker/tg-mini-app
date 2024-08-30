import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { OrderItemComponent } from './order-item.component';
import { BackButtonServiceSpy } from "../../../../testing-utils/back-button-service-spy";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import {
  OrderStatus,
  PortfolioOrder
} from "@api-lib";

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
        BackButtonServiceSpy.getSpy().provider
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
