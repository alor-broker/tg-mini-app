import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  BehaviorSubject,
  filter,
  Observable,
  shareReplay,
  take
} from "rxjs";
import {
  Portfolio,
  PortfolioKey,
  PortfolioMarket
} from "../../core/models/porfolio.models";
import {
  ClientPortfolio,
  ClientService,
  PortfolioPositionsService
} from "@api-lib";
import { UserStateService } from "../../core/services/user-state.service";
import { mapWith } from "../../core/utils/observable-helper";
import { map } from "rxjs/operators";
import { CollectionsHelper } from "../../core/utils/collections.helper";

@Injectable({
  providedIn: 'root'
})
export class SelectedPortfolioDataContextService implements OnDestroy {
  private availablePortfolios$: Observable<Portfolio[]> | null = null;
  private readonly currentSelection$ = new BehaviorSubject<Portfolio | null>(null);

  constructor(
    private readonly apiClientService: ClientService,
    private readonly apiPortfolioPositionsService: PortfolioPositionsService,
    private readonly userStateService: UserStateService
  ) {

  }

  get portfolios$(): Observable<Portfolio[]> {
    return this.getAvailablePortfolios();
  }

  get selectedPortfolio$(): Observable<Portfolio> {
    this.currentSelection$.pipe(
      take(1)
    ).subscribe(portfolio => {
      if (portfolio == null) {
        this.getAvailablePortfolios().pipe(
          take(1)
        ).subscribe(portfolios => {
          if (portfolios.length > 0) {
            this.currentSelection$.next(portfolios[0]);
          }
        });
      }
    });

    return this.currentSelection$.pipe(
      filter((x): x is Portfolio => !!x),
      shareReplay(1)
    );
  }

  selectPortfolio(targetPortfolio: Portfolio): void {
    this.currentSelection$.next(targetPortfolio);
  }

  ngOnDestroy(): void {
    this.currentSelection$.complete();
  }

  private getAvailablePortfolios(): Observable<Portfolio[]> {
    if (this.availablePortfolios$ == null) {
      this.availablePortfolios$ = this.userStateService.user$.pipe(
        mapWith(
          u => this.apiClientService.getPortfolios(u.clientId),
          (user, portfolios) => ({
            user,
            portfolios
          })),
        mapWith(
          x => this.apiPortfolioPositionsService.getAllForClient(x.user.login),
          (source, positions) => ({
            ...source,
            positions
          })
        ),
        map(x => {
          const positionPortfolios = CollectionsHelper.selectUnique(
            x.positions ?? [],
            element => ({
              portfolio: element.portfolio,
              exchange: element.exchange
            }) as PortfolioKey
          );

          const portfolios: Portfolio[] = [];
          for (const portfolio of x.portfolios ?? []) {
            const positionPortfolio = positionPortfolios.find(p => p.portfolio === portfolio.portfolio);
            if (positionPortfolio != null) {
              portfolios.push({
                portfolioKey: positionPortfolio,
                market: this.getPortfolioMarket(portfolio)
              })
            }
          }

          return portfolios.sort((a, b) => a.portfolioKey.portfolio.localeCompare(b.portfolioKey.portfolio));
        }),
        take(1),
        shareReplay(1)
      );
    }

    return this.availablePortfolios$
  }

  private getPortfolioMarket(clientPortfolio: ClientPortfolio): PortfolioMarket | null {
    if (clientPortfolio.portfolio.startsWith('D')) {
      return PortfolioMarket.Fond;
    }

    if (clientPortfolio.portfolio.startsWith('G')) {
      return PortfolioMarket.Curr;
    }

    if (clientPortfolio.portfolio.startsWith('E')) {
      return PortfolioMarket.United;
    }

    if (/^\d/.test(clientPortfolio.portfolio)) {
      return PortfolioMarket.Forts;
    }

    return null;
  }
}
