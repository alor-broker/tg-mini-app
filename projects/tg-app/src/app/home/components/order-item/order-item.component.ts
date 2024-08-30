import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  OrderStatus, OrderType,
  PortfolioOrder,
  PortfolioStopOrder, Side, StopOrderCondition
} from "@api-lib";
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";
import { BackButtonService } from "@environment-services-lib";
import { DatePipe, NgClass } from "@angular/common";
import { OrderConditionPipe } from "../../../core/pipes/order-condition.pipe";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { TranslocoDirective } from "@jsverse/transloco";


@Component({
  selector: 'tga-order-item',
  standalone: true,
  imports: [
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    DatePipe,
    OrderConditionPipe,
    NgClass,
    SectionsComponent,
    SectionPanelComponent,
    TranslocoDirective,
  ],
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) order!: PortfolioStopOrder | PortfolioOrder;
  @Output() onBack = new EventEmitter();

  orderSide = Side;
  orderStatus = OrderStatus;
  orderType = OrderType;

  constructor(private readonly backButtonService: BackButtonService) {

  }

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
