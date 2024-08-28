import {
  Component,
  EventEmitter,
  OnInit,
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
  startWith,
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
import { ViewModel } from "../../../core/models/view-model.model";
import { Portfolio } from "../../../core/models/porfolio.models";
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { TranslocoDirective } from "@jsverse/transloco";

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
    NgClass,
    NzSkeletonComponent,
    TranslocoDirective
  ],
  templateUrl: './stop-orders-list.component.html',
  styleUrl: './stop-orders-list.component.less'
})
export class StopOrdersListComponent implements OnInit {
  viewModel$!: Observable<ViewModel<PortfolioStopOrder[]>>;

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
    const getOrders = (portfolio: Portfolio) => {
      return this.apiPortfolioOrdersService.getSessionStopOrders(portfolio.portfolioKey).pipe(
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
}
