import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import {
  Instrument,
  LessMore,
  NewOrderResponse,
  NewStopLimitOrder,
  NewStopMarketOrder,
  OrdersService,
  Side
} from "@api-lib";
import { inputNumberValidation } from "../../../../core/utils/validation-options";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe } from "@angular/common";
import { InputNumberComponent } from "../../../../core/components/input-number/input-number.component";
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { SubmitOrderButtonsComponent } from "../../submit-order-buttons/submit-order-buttons.component";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { NzRadioComponent, NzRadioGroupComponent } from "ng-zorro-antd/radio";
import { BaseOrderFormComponent } from "../base-order-form.component";
import moment from "moment";

@Component({
  selector: 'tga-stop-order-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    InputNumberComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    ReactiveFormsModule,
    SubmitOrderButtonsComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    NzRadioGroupComponent,
    NzRadioComponent
  ],
  templateUrl: './stop-order-form.component.html',
  styleUrls: [
    './stop-order-form.component.less',
    '../base-order-form.component.less'
  ]
})
export class StopOrderFormComponent extends BaseOrderFormComponent implements OnInit {
  conditionType = LessMore;

  form = this.formBuilder.group({
    quantity: this.formBuilder.control<number | null>(
      null,
      [
        Validators.required,
        Validators.min(inputNumberValidation.min),
        Validators.max(inputNumberValidation.max)
      ]
    ),
    price: this.formBuilder.control<number | null>(null),
    triggerPrice: this.formBuilder.control<number | null>(null),
    condition: this.formBuilder.nonNullable.control(LessMore.More),
    stopEndUnixTime: this.formBuilder.control<Date | null>(null),
    withLimit: this.formBuilder.nonNullable.control(false),
  });

  override get canSubmit(): boolean {
    return this.form.valid;
  }

  constructor(
    private readonly ordersService: OrdersService
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    this.subscribeToFormControlsChange();
  }

  protected override prepareOrderStream(side: Side, instrument: Instrument, portfolio: string): Observable<NewOrderResponse | null> {
    const formValue = this.form.value;
    const options= {
      errorTracker: this.orderApiErrorsTracker
    };

    const orderReq= {
      ...formValue,
      side,
      stopEndUnixTime: formValue.stopEndUnixTime == null ? undefined : moment(formValue.stopEndUnixTime).unix(),
      instrument: this.toInstrumentKey(instrument)
    };

    if (formValue.withLimit) {
      return this.ordersService.submitStopLimitOrder(
        orderReq as NewStopLimitOrder,
        portfolio,
        options
      )
    }

    return this.ordersService.submitStopMarketOrder(
      orderReq as NewStopMarketOrder,
      portfolio,
      options
    )
  }

  disabledDate = (date: Date): boolean => {
    const today = moment().startOf('day');
    return moment(date).unix() < today.unix();
  };

  protected override changeInstrument(instrument: Instrument, portfolio: string) {
    this.setPriceValidators(this.form.controls.triggerPrice, instrument);
    this.setPriceValidators(this.form.controls.price, instrument);
  }

  private subscribeToFormControlsChange() {
    this.form.controls.withLimit.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(val => {
        if (val) {
          this.form.controls.price.enable();
        } else {
          this.form.controls.price.disable();
        }
      });

    this.form.controls.triggerPrice.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(val => {
        this.form.controls.price.setValue(val);
      });
  }
}
