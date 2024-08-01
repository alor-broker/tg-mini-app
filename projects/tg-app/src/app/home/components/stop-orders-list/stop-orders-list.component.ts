import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  OrderStatus,
  OrderType,
  PortfolioOrder,
  PortfolioOrdersService,
  PortfolioStopOrder,
  Side
} from "@api-lib";
import {
  Observable,
  shareReplay,
  switchMap
} from "rxjs";
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";
import { map } from "rxjs/operators";
import {
  AsyncPipe,
  DecimalPipe,
  NgClass
} from "@angular/common";
import { ListComponent } from "../../../core/components/list/list/list.component";
import { ListItemComponent } from "../../../core/components/list/list-item/list-item.component";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzTypographyComponent } from "ng-zorro-antd/typography";

@Component({
  selector: 'tga-stop-orders-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    ListComponent,
    ListItemComponent,
    NzAvatarComponent,
    NzIconDirective,
    NzTypographyComponent,
    NgClass
  ],
  templateUrl: './stop-orders-list.component.html',
  styleUrl: './stop-orders-list.component.less'
})
export class StopOrdersListComponent {
  orders$!: Observable<PortfolioStopOrder[]>;

  @Output()
  selectItem = new EventEmitter<PortfolioStopOrder>();

  readonly Sides = Side;
  readonly Statuses = OrderStatus;
  readonly OrderTypes = OrderType;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioOrdersService: PortfolioOrdersService,
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => this.apiPortfolioOrdersService.getSessionStopOrders(p.portfolioKey)),
      map(t => t ?? []),
      shareReplay(1)
    )
  }

  getIconUrl(order: PortfolioOrder): string {
    return this.instrumentIconSourceService.getIconUrl(order.symbol);
  }
}
