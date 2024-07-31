import {
  Component,
  OnInit
} from '@angular/core';
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import {
  PortfolioPosition,
  PortfolioPositionsService
} from "@api-lib";
import {
  Observable,
  shareReplay,
  switchMap
} from "rxjs";
import { map } from "rxjs/operators";
import {
  AsyncPipe,
  DecimalPipe
} from "@angular/common";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";
import { ListItemComponent } from "../../../core/components/list/list-item/list-item.component";
import { ListComponent } from "../../../core/components/list/list/list.component";

@Component({
  selector: 'tga-positions-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    NzTypographyComponent,
    NzAvatarComponent,
    ListItemComponent,
    ListComponent
  ],
  templateUrl: './positions-list.component.html',
  styleUrl: './positions-list.component.less'
})
export class PositionsListComponent implements OnInit {
  positions$!: Observable<PortfolioPosition[]>;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioPositionsService: PortfolioPositionsService,
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  ngOnInit(): void {
    this.positions$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(p => this.apiPortfolioPositionsService.getAllForPortfolio(p.portfolioKey)),
      map(p => p ?? []),
      shareReplay(1)
    );
  }

  showLots(position: PortfolioPosition): boolean {
    return position.symbol !== 'RUB'
  }

  positionTitle(position: PortfolioPosition): string {
    if (position.symbol !== 'RUB') {
      return position.shortName;
    }

    return 'Рубли'
  }

  iconSymbol(position: PortfolioPosition): string{
    if (position.symbol !== 'RUB') {
      return position.symbol;
    }

    return '₽'
  }

  getIconUrl(position: PortfolioPosition): string {
    return this.instrumentIconSourceService.getIconUrl(position.symbol);
  }
}
