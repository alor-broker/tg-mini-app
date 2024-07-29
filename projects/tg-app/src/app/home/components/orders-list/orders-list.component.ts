import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  Observable,
  shareReplay,
  switchMap
} from "rxjs";
import {
  OrderStatus,
  PortfolioOrder,
  PortfolioOrdersService,
  Side
} from "@api-lib";
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";
import { map } from "rxjs/operators";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import {
  AsyncPipe,
  DecimalPipe,
  NgClass
} from "@angular/common";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-orders-list',
  standalone: true,
  imports: [
    NzAvatarComponent,
    NgClass,
    AsyncPipe,
    NzTypographyComponent,
    DecimalPipe,
    NzIconDirective
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.less'
})
export class OrdersListComponent implements OnInit {
  orders$!: Observable<PortfolioOrder[]>;

  @Output()
  selectItem = new EventEmitter<PortfolioOrder>();

  readonly Sides = Side;
  readonly Statuses = OrderStatus;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioOrdersService: PortfolioOrdersService,
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => this.apiPortfolioOrdersService.getSessionLimitMarketOrders(p.portfolioKey)),
      map(t => t ?? []),
      shareReplay(1)
    )
  }

  getIconUrl(order: PortfolioOrder): string {
    return this.instrumentIconSourceService.getIconUrl(order.symbol);
  }
}
