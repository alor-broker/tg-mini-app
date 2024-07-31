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
    ListItemComponent
  ],
  templateUrl: './trades-list.component.html',
  styleUrl: './trades-list.component.less'
})
export class TradesListComponent implements OnInit {
  trades$!: Observable<PortfolioTrade[]>;

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
    this.trades$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => this.apiPortfolioTradesService.getSessionTrades(p.portfolioKey)),
      map(t => t ?? []),
      shareReplay(1)
    )
  }

  getIconUrl(trade: PortfolioTrade): string {
    return this.instrumentIconSourceService.getIconUrl(trade.symbol);
  }
}
