import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  Observable,
  shareReplay,
  startWith,
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
import { ListComponent } from "../../../core/components/list/list/list.component";
import { ListItemComponent } from "../../../core/components/list/list-item/list-item.component";
import { ViewModel } from "../../../core/models/view-model.model";
import { Portfolio } from "../../../core/models/porfolio.models";
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: 'tga-orders-list',
  standalone: true,
  imports: [
    NzAvatarComponent,
    NgClass,
    AsyncPipe,
    NzTypographyComponent,
    DecimalPipe,
    NzIconDirective,
    ListComponent,
    ListItemComponent,
    NzSkeletonComponent,
    TranslocoDirective
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.less'
})
export class OrdersListComponent implements OnInit {
  viewModel$!: Observable<ViewModel<PortfolioOrder[]>>;

  @Output()
  selectItem = new EventEmitter<Pick<PortfolioOrder, 'portfolio' | 'exchange' | 'id' | 'type'>>();

  readonly Sides = Side;
  readonly Statuses = OrderStatus;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioOrdersService: PortfolioOrdersService,
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  ngOnInit(): void {
    const getOrders = (portfolio: Portfolio) => {
      return this.apiPortfolioOrdersService.getSessionLimitMarketOrders(portfolio.portfolioKey).pipe(
        map(t => t ?? []),
        map(p => ({
          isUpdating: true,
          viewData: p
        })),
        startWith(({
          isUpdating: true
        })),
      );
    }

    this.viewModel$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => getOrders(p)),
      startWith(({
        isUpdating: true
      })),
      shareReplay(1)
    )
  }

  getIconUrl(order: PortfolioOrder): string {
    return this.instrumentIconSourceService.getIconUrl(order.symbol);
  }

  selectOrder(order: PortfolioOrder) {
    this.selectItem.emit({
      id: order.id,
      portfolio: order.portfolio,
      exchange: order.exchange,
      type: order.type
    })
  }
}
