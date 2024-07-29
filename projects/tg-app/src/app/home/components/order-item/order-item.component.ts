import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  OrderStatus, OrderType,
  PortfolioOrder,
  PortfolioStopOrder, Side, StopOrderCondition
} from "@api-lib";
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";
import { BackButtonService } from "@environment-services-lib";
import { DatePipe, NgClass } from "@angular/common";
import { OrderStatusPipe } from "../../../core/pipes/order-status.pipe";
import { OrderSidePipe } from "../../../core/pipes/order-side.pipe";
import { OrderTypePipe } from "../../../core/pipes/order-type.pipe";
import { OrderConditionPipe } from "../../../core/pipes/order-condition.pipe";


@Component({
  selector: 'tga-order-item',
  standalone: true,
  imports: [
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    DatePipe,
    OrderStatusPipe,
    OrderSidePipe,
    OrderTypePipe,
    OrderConditionPipe,
    NgClass,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.less'
})
export class OrderItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) order!: PortfolioStopOrder | PortfolioOrder;
  @Output() onBack = new EventEmitter();

  orderSide = Side;
  orderStatus = OrderStatus;
  orderType = OrderType;

  constructor(
    private readonly backButtonService: BackButtonService,
  ) {}

  private onBackButtonCallback = () => {
    this.onBack.emit();
    this.backButtonService.hide();
  }

  ngOnInit() {
    this.backButtonService.onClick(this.onBackButtonCallback)
    this.backButtonService.show();
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBackButtonCallback);
  }

  getOrderStopPrice(): number | null {
    return (this.order as PortfolioStopOrder).stopPrice ?? null
  }

  getOrderCondition(): StopOrderCondition | null {
    return (this.order as PortfolioStopOrder).condition ?? null
  }
}
