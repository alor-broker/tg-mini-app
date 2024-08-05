import {
  Component,
  OnInit
} from '@angular/core';
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import {
  PortfolioSummary,
  PortfolioSummaryService
} from "@api-lib";
import {
  filter,
  Observable,
  shareReplay,
  startWith
} from "rxjs";
import {
  map,
  switchMap
} from "rxjs/operators";
import {
  AsyncPipe,
  DecimalPipe
} from "@angular/common";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { ViewModel } from "../../../core/models/view-model.model";
import { Portfolio } from "../../../core/models/porfolio.models";
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-portfolio-evaluation',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    NzTypographyComponent,
    NzIconDirective
  ],
  templateUrl: './portfolio-evaluation.component.html',
  styleUrl: './portfolio-evaluation.component.less'
})
export class PortfolioEvaluationComponent implements OnInit {
  viewModel$!: Observable<ViewModel<PortfolioSummary>>;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioSummaryService: PortfolioSummaryService
  ) {
  }

  ngOnInit(): void {
    const getSummary = (portfolio: Portfolio): Observable<ViewModel<PortfolioSummary>> => {
      return this.apiPortfolioSummaryService.getPortfolioSummary(portfolio.portfolioKey).pipe(
        filter((p): p is PortfolioSummary => p != null),
        map(s => ({
          isUpdating: false,
          viewData: s
        })),
        startWith(({
          isUpdating: true
        })),
      )
    };

    this.viewModel$ =
      this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
        switchMap(portfolio => getSummary(portfolio)),
        startWith(({
          isUpdating: true
        })),
        shareReplay(1)
      );
  }
}
