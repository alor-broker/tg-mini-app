import { Component, Input, OnInit } from '@angular/core';
import { Evaluation, EvaluationRequest, EvaluationService } from "@api-lib";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from "ng-zorro-antd/descriptions";

interface DisplayEvaluation extends Evaluation {
  currency: string;
}

@Component({
  selector: 'tga-order-evaluation',
  standalone: true,
  imports: [
    AsyncPipe,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    CurrencyPipe
  ],
  templateUrl: './order-evaluation.component.html',
  styleUrl: './order-evaluation.component.less'
})
export class OrderEvaluationComponent implements OnInit {

  private readonly evaluationRequest$ = new BehaviorSubject<EvaluationRequest | null>(null);
  evaluation$!: Observable<DisplayEvaluation | null>;

  @Input({required: true})
  set evaluationProperties(evaluationProperties: EvaluationRequest | null) {
    this.evaluationRequest$.next(evaluationProperties);
  }

  constructor(
    private readonly evaluationService: EvaluationService,
  ) {
  }

  ngOnInit() {
    const getEvaluationDisplay = (request: EvaluationRequest): Observable<DisplayEvaluation | null> =>
      this.evaluationService.evaluateOrder(request)
        .pipe(
          map(evaluation => {
            if (evaluation == null) {
              return null;
            }

            return {
              ...evaluation,
              currency: request.instrumentCurrency ?? 'RUB'
            }
          })
        );

    this.evaluation$ = this.evaluationRequest$.pipe(
      filter((er): er is EvaluationRequest => er != null),
      switchMap(er => getEvaluationDisplay(er))
    );
  }
}
