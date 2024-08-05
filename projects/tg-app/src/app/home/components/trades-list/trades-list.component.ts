import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import {
  PortfolioTrade,
  PortfolioTradesService,
  Side
} from "@api-lib";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";
import {
  Observable,
  shareReplay,
  startWith,
  switchMap
} from "rxjs";
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

@Component({
  selector: 'tga-trades-list',
  standalone: true,
  imports: [
    NzAvatarComponent,
    AsyncPipe,
    DecimalPipe,
    NzTypographyComponent,
    NgClass,
    NzIconDirective,
    ListComponent,
    ListItemComponent,
    NzSkeletonComponent
  ],
  templateUrl: './trades-list.component.html',
  styleUrl: './trades-list.component.less'
})
export class TradesListComponent implements OnInit {
  viewModel$!: Observable<ViewModel<PortfolioTrade[]>>;

  @Output()
  selectItem = new EventEmitter<PortfolioTrade>();

  readonly Sides = Side;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioTradesService: PortfolioTradesService,
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  ngOnInit(): void {
    const getTrades = (portfolio: Portfolio): Observable<ViewModel<PortfolioTrade[]>> => {
      return this.apiPortfolioTradesService.getSessionTrades(portfolio.portfolioKey).pipe(
        map(t => t ?? []),
        map(p => ({
          isUpdating: true,
          viewData: p
        })),
        startWith(({
          isUpdating: true
        })),
      )
    }

    this.viewModel$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => getTrades(p)),
      shareReplay(1),
      startWith(({
        isUpdating: true
      })),
    )
  }

  getIconUrl(trade: PortfolioTrade): string {
    return this.instrumentIconSourceService.getIconUrl(trade.symbol);
  }
}
