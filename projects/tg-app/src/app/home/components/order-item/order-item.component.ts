import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  OrdersService,
  OrderStatus,
  OrderType,
  PortfolioOrder,
  PortfolioStopOrder,
  Side,
  StopOrderCondition
} from "@api-lib";
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";
import { BackButtonService, ButtonType, LinksService, ModalService } from "@environment-services-lib";
import { DatePipe, NgClass } from "@angular/common";
import { OrderConditionPipe } from "../../../core/pipes/order-condition.pipe";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { TranslocoDirective } from "@jsverse/transloco";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { TranslatorFn, TranslatorService } from "../../../core/services/translator.service";
import { Observable, shareReplay, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { OrderApiErrorsTracker } from "../../../core/utils/order-api-errors-tracker";
import { OrderActionType } from "../../../core/models/order-api-errors-tracker.model";
import { Clipboard } from "@angular/cdk/clipboard";


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
    NzButtonComponent,
  ],
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) order!: PortfolioStopOrder | PortfolioOrder;
  @Output() onBack = new EventEmitter();

  orderSide = Side;
  orderStatus = OrderStatus;
  orderType = OrderType;

  private ordersTranslator!: Observable<TranslatorFn>;
  private orderApiErrorsTracker!: OrderApiErrorsTracker;

  constructor(
    private readonly backButtonService: BackButtonService,
    private readonly ordersService: OrdersService,
    private readonly modalService: ModalService,
    private readonly translatorService: TranslatorService,
    private readonly clipboard: Clipboard,
    private readonly linksService: LinksService,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  private onBackButtonCallback = () => {
    this.onBack.emit();
    this.backButtonService.hide();
  }

  ngOnInit() {
    this.backButtonService.onClick(this.onBackButtonCallback)
    this.backButtonService.show();
    this.ordersTranslator = this.translatorService.getTranslator('home/order-item')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        shareReplay(1)
      );

    this.orderApiErrorsTracker = new OrderApiErrorsTracker(
      this.modalService,
      this.clipboard,
      this.linksService,
      this.translatorService,
      OrderActionType.Cancel
    );
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

  cancelOrder() {
    this.ordersTranslator
      .pipe(
        switchMap(t => this.modalService.showMessage({
            message: t([ 'cancelModalMessage' ]),
            buttons: [
              { type: ButtonType.Default, text: t([ 'no' ]) },
              { type: ButtonType.Destructive, text: t([ 'yes' ]), id: 'yes' }
            ]
          })
        )
      )
      .subscribe(btnId => {
        if (btnId === 'yes') {
          this.ordersService.cancelOrder(
              this.order.id,
              {
                portfolio: this.order.portfolio,
                exchange: this.order.exchange,
                stop: this.order.type === OrderType.StopMarket || this.order.type === OrderType.StopLimit
              },
              { errorTracker: this.orderApiErrorsTracker }
            )
            .subscribe((res) => {
              if (res?.message === 'success') {
                this.order.status = OrderStatus.Canceled;
                this.cdr.detectChanges();
              }
            })
        }
      })
  }
}
