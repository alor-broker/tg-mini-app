import {
  Component,
  OnInit
} from '@angular/core';
import {
  InvestmentIdea,
  InvestmentIdeasService
} from "@api-lib";
import { ViewModel } from "../../../core/models/view-model.model";
import { map } from "rxjs/operators";
import {
  Observable,
  shareReplay,
  startWith
} from "rxjs";
import { AsyncPipe } from "@angular/common";
import { NzSkeletonComponent } from "ng-zorro-antd/skeleton";
import { NzTypographyComponent } from "ng-zorro-antd/typography";
import { TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: 'tga-investment-ideas-preview',
  standalone: true,
  imports: [
    AsyncPipe,
    NzSkeletonComponent,
    NzTypographyComponent,
    TranslocoDirective
  ],
  templateUrl: './investment-ideas-preview.component.html',
  styleUrl: './investment-ideas-preview.component.less'
})
export class InvestmentIdeasPreviewComponent implements OnInit {
  viewModel$!: Observable<ViewModel<InvestmentIdea | null>>;

  constructor(private readonly investmentIdeasService: InvestmentIdeasService) {
  }

  ngOnInit(): void {
    this.viewModel$ =
      this.investmentIdeasService.getInvestmentIdeas({
        orderBy: 'timestamp',
        valid: true
      }).pipe(
        map(i => {
          const ideas = i ?? [];

          const latestIdea = ideas.length > 0
            ? ideas[ideas.length - 1]
            : null;

          return {
            isUpdating: false,
            viewData: latestIdea
          };
        }),
        startWith(({
          isUpdating: true
        })),
        shareReplay(1)
      );
  }
}
