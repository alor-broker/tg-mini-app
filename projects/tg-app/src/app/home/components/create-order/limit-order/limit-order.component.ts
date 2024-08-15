import { Component, DestroyRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { InputNumberComponent } from "../../../../core/components/input-number/input-number.component";
import { inputNumberValidation } from "../../../../core/utils/validation-options";
import {
  EvaluationRequest,
  Instrument,
  InstrumentKey,
  NewLimitOrder,
  OrdersService,
  Side
} from "@api-lib";
import { BehaviorSubject, filter, switchMap, take } from "rxjs";
import { SectionsComponent } from "../../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../../core/components/sections/section-panel/section-panel.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TgaValidators } from "../../../../core/utils/validators";
import { SubmitOrderButtonsComponent } from "../submit-order-buttons/submit-order-buttons.component";
import { SelectedPortfolioDataContextService } from "../../../services/selected-portfolio-data-context.service";
import { mapWith } from "../../../../core/utils/observable-helper";
import { AsyncPipe } from "@angular/common";
import { OrderEvaluationComponent } from "../order-evaluation/order-evaluation.component";
import { ModalService } from "@environment-services-lib";
import { OrderApiErrorsTracker } from "../../../utils/order-api-errors-tracker";

@Component({
  selector: 'tga-limit-order',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputNumberComponent,
    InputNumberComponent,
    SectionsComponent,
    SectionPanelComponent,
    SubmitOrderButtonsComponent,
    AsyncPipe,
    OrderEvaluationComponent
  ],
  templateUrl: './limit-order.component.html',
  styleUrl: './limit-order.component.less'
})
export class LimitOrderComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);

  private orderApiErrorsTracker!: OrderApiErrorsTracker;

  readonly evaluationRequest$ = new BehaviorSubject<EvaluationRequest | null>(null);

  @Input({ required: true }) set instrument(instr: Instrument | null) {
    this.selectedInstrument$.next(instr);
  }

  selectedInstrument$ = new BehaviorSubject<Instrument | null>(null);

  form = this.formBuilder.group({
    quantity: this.formBuilder.control<number | null>(
      null,
      [
        Validators.required,
        Validators.min(inputNumberValidation.min),
        Validators.max(inputNumberValidation.max)
      ]
    ),
    price: this.formBuilder.control<number | null>(
      null,
      [
        Validators.required,
        Validators.min(inputNumberValidation.negativeMin),
        Validators.max(inputNumberValidation.max)
      ]
    )
  });

  constructor(
    private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService,
    private readonly ordersService: OrdersService,
    private readonly modalService: ModalService,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.orderApiErrorsTracker = new OrderApiErrorsTracker(this.modalService);

    this.subscribeToInstrumentChange();
    this.getEvaluationSub();
  }

  ngOnDestroy() {
    this.selectedInstrument$.complete();
    this.evaluationRequest$.complete();
  }

  submitOrder(side: Side) {
    this.selectedPortfolioDataContextService.selectedPortfolio$
      .pipe(
        mapWith(
          () => this.selectedInstrument$,
          (portfolio, selectedInstrument) => ({ portfolio, selectedInstrument })
        ),
        take(1),
        switchMap(({ portfolio, selectedInstrument }) => {
          const { quantity, price } = this.form.value;

          const req: NewLimitOrder = {
            quantity: quantity!,
            price: price!,
            instrument: selectedInstrument! as InstrumentKey,
            side
          };

          return this.ordersService.submitLimitOrder(
            req,
            portfolio.portfolioKey.portfolio,
            {
              errorTracker: this.orderApiErrorsTracker
            }
          )
        })
      )
      .subscribe(res => {
        if (res != null) {
          this.modalService.showMessage(`Лимитная заявка успешно выставлена, её номер на бирже ${ res?.orderNumber }`, 'Заявка выставлена');
        }
      })
  }

  private subscribeToInstrumentChange() {
    let priceStepMultiplicityValidator: ValidatorFn;

    this.selectedInstrument$
      .pipe(
        filter(i => i != null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(i => {
        this.form.controls.price.removeValidators(priceStepMultiplicityValidator);

        priceStepMultiplicityValidator = TgaValidators.stepMultiplicity(i.minstep);
        this.form.controls.price.addValidators(priceStepMultiplicityValidator);

        this.form.updateValueAndValidity({ onlySelf: false });
      });
  }

  private getEvaluationSub() {
    this.form.valueChanges
      .pipe(
        mapWith(
          () => this.selectedInstrument$,
          (formValue, selectedInstrument) => ({ formValue, selectedInstrument })
        ),
        mapWith(
          () => this.selectedPortfolioDataContextService.selectedPortfolio$,
          (data, selectedPortfolio) => ({ ...data, selectedPortfolio: selectedPortfolio.portfolioKey.portfolio })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ formValue, selectedInstrument, selectedPortfolio }) => {
        if (this.form.invalid || selectedInstrument == null) {
          this.evaluationRequest$.next(null);
          return;
        }

        this.evaluationRequest$.next({
          portfolio: selectedPortfolio,
          instrument: selectedInstrument,
          price: formValue.price as number,
          lotQuantity: formValue.quantity as number
        });
      })
  }
}
