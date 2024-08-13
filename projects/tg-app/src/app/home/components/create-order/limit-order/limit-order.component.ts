import { Component, DestroyRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { InputNumberComponent } from "../../../../core/components/input-number/input-number.component";
import { inputNumberValidation } from "../../../../core/utils/validation-options";
import { Instrument, InstrumentKey, NewLimitOrder, OrdersService, Side } from "@api-lib";
import { BehaviorSubject, filter, switchMap, take } from "rxjs";
import { SectionsComponent } from "../../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../../core/components/sections/section-panel/section-panel.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TgaValidators } from "../../../../core/utils/validators";
import { SubmitOrderButtonsComponent } from "../submit-order-buttons/submit-order-buttons.component";
import { SelectedPortfolioDataContextService } from "../../../services/selected-portfolio-data-context.service";
import { mapWith } from "../../../../core/utils/observable-helper";
import { AsyncPipe } from "@angular/common";

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
    AsyncPipe
  ],
  templateUrl: './limit-order.component.html',
  styleUrl: './limit-order.component.less'
})
export class LimitOrderComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true }) set instrument(instr: Instrument | null) {
    this.selectedInstrument$.next(instr);
  }

  selectedInstrument$ = new BehaviorSubject<Instrument | null>(null);

  form = this.formBuilder.group({
    quantity: this.formBuilder.control(
      null,
      [
        Validators.required,
        Validators.min(inputNumberValidation.min),
        Validators.max(inputNumberValidation.max)
      ]
    ),
    price: this.formBuilder.control(
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
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.subscribeToInstrumentChange();
  }

  ngOnDestroy() {
    this.selectedInstrument$.complete();
  }

  private subscribeToInstrumentChange() {
    let priceStepMultiplicityValidator = TgaValidators.stepMultiplicity(0);

    this.selectedInstrument$
      .pipe(
        filter(i => i != null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(i => {
        this.form.controls['price'].removeValidators(priceStepMultiplicityValidator);

        priceStepMultiplicityValidator = TgaValidators.stepMultiplicity(i.minstep);
        this.form.controls['price'].addValidators(priceStepMultiplicityValidator);

        this.form.updateValueAndValidity({ onlySelf: false });
      });
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

          return this.ordersService.submitLimitOrder(req, portfolio.portfolioKey.portfolio)
        })
      )
      .subscribe(res => {
        console.log(res);
      })
  }
}
