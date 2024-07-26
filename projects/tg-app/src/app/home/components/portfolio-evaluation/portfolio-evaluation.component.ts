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
  shareReplay
} from "rxjs";
import { switchMap } from "rxjs/operators";
import {
  AsyncPipe,
  DecimalPipe
} from "@angular/common";

@Component({
  selector: 'tga-portfolio-evaluation',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe
  ],
  templateUrl: './portfolio-evaluation.component.html',
  styleUrl: './portfolio-evaluation.component.less'
})
export class PortfolioEvaluationComponent implements OnInit {
  portfolioSummary$!: Observable<PortfolioSummary>;

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly apiPortfolioSummaryService: PortfolioSummaryService
  ) {
  }

  ngOnInit(): void {
    this.portfolioSummary$ = this.selectedPortfolioDataContextService.selectedPortfolio$.pipe(
      switchMap(portfolio => this.apiPortfolioSummaryService.getPortfolioSummary(portfolio.portfolioKey)),
      filter((p): p is PortfolioSummary => p != null),
      shareReplay(1)
    );
  }
}
