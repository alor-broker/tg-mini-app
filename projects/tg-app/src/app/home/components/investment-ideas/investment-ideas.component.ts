import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";
import { InvestmentIdeasService, InvestmentIdea, InstrumentsService, InstrumentKey } from "@api-lib";
import { BehaviorSubject, forkJoin, Observable, tap } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";
import { mapWith } from "../../../core/utils/observable-helper";
import { NzSpinComponent } from "ng-zorro-antd/spin";
import { BackButtonService } from "@environment-services-lib";
import { MarketService } from "../../../core/services/market.service";
import { map } from "rxjs/operators";
import { WatchedInvestmentIdeasService } from "../../services/watched-investment-ideas.service";
import { NzCollapseComponent, NzCollapsePanelComponent } from "ng-zorro-antd/collapse";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonComponent } from "ng-zorro-antd/button";


interface InvestmentIdeaExtended extends InvestmentIdea {
  userFullName: string;
  symbolShortName: string;
}

@Component({
  selector: 'tga-investment-ideas',
  standalone: true,
  imports: [
    CommonModule,
    NzSpinComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    AsyncPipe,
    NzButtonComponent
  ],
  templateUrl: './investment-ideas.component.html',
  styleUrl: './investment-ideas.component.less'
})
export class InvestmentIdeasComponent implements OnInit, OnDestroy {

  @Output() onBack = new EventEmitter();

  isLoading$ = new BehaviorSubject(true);
  investmentIdeas$!: Observable<InvestmentIdeaExtended[]>;

  watchedIdeasIdsSet?: Set<number>;

  constructor(
    private readonly investmentIdeasService: InvestmentIdeasService,
    private readonly watchedInvestmentIdeasService: WatchedInvestmentIdeasService,
    private readonly backButtonService: BackButtonService,
    private readonly instrumentsService: InstrumentsService,
    private readonly marketService: MarketService
  ) {}

  ngOnInit() {
    this.investmentIdeas$ = this.investmentIdeasService.getAuthors()
      .pipe(
        // get investment ideas with author name
        mapWith(
          () => this.investmentIdeasService.getInvestmentIdeas({
            orderBy: 'timestamp'
          }),
          (authors, ideas) => {
            return (ideas ?? [])
              .reverse()
              .map(idea => {
                const userFullName = authors?.find(a => a.userId === idea.userId)?.fullName ?? 'Неизвестен';

                return {
                  ...idea,
                  userFullName
                };
              })
          }
        ),
        mapWith(
          () => this.marketService.getDefaultExchange(),
          (ideas, defaultExchange) => ({ ideas, defaultExchange })
        ),
        // get investment ideas with symbol short name
        mapWith(
          ({ ideas, defaultExchange }) => {

            const tickersMap = new Map<string, Observable<string>>;

            ideas.forEach(idea => {
              if (!tickersMap.has(idea.symbol)) {
                tickersMap.set(
                  idea.symbol,
                  this.instrumentsService.getInstrument(this.instrumentKeyFromTicker(idea.symbol, defaultExchange!))
                    .pipe(
                      map(i => i?.shortName ?? '')
                    )
                )
              }
            });

            return forkJoin(Object.fromEntries(tickersMap));
          },
          ({ ideas }, tickers) => ideas.map(idea => ({
            ...idea,
            symbolShortName: tickers[idea.symbol]
            })
          )
        ),
        tap(ideas => this.initWatchedIdeas(ideas)),
        tap(() => this.isLoading$.next(false))
      );

    this.backButtonService.onClick(this.onBackButtonCallback)
    this.backButtonService.show();
  }

  ngOnDestroy() {
    if (this.watchedIdeasIdsSet != null) {
      this.watchedInvestmentIdeasService.setWatchedIdeasIds(Array.from(this.watchedIdeasIdsSet));
    }
    this.backButtonService.offClick(this.onBackButtonCallback);
    this.isLoading$.complete();
  }

  private onBackButtonCallback = () => {
    this.onBack.emit();
    this.backButtonService.hide();
  }

  private instrumentKeyFromTicker(ticker: string, defaultExchange: string): InstrumentKey {
    const parts = ticker.split(':');
    const exchange = parts.length > 1
      ? parts[0]
      : defaultExchange!;
    const symbol = parts.length > 1 ? parts[1] : parts[0];
    const instrumentGroup = parts[2];

    return {
      exchange: exchange.toUpperCase(),
      symbol,
      instrumentGroup
    };
  }

  private initWatchedIdeas(ideas: InvestmentIdeaExtended[]) {
    this.watchedInvestmentIdeasService.getWatchedIdeasIds()
      .subscribe(ids => {
        const currentIdeasIds = ideas.map(idea => idea.signalId);
        this.watchedIdeasIdsSet = new Set(ids.filter(id => currentIdeasIds.includes(id)));
      })
  }

  watchIdea(id: number) {
    this.watchedIdeasIdsSet!.add(id);
  }
}
