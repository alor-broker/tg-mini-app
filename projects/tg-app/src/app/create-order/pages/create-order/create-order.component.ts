import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { Instrument, InstrumentKey, InstrumentsService } from "@api-lib";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { NzTabComponent, NzTabSetComponent } from "ng-zorro-antd/tabs";
import { InstrumentSelectComponent } from "../../components/instrument-select/instrument-select.component";
import { InstrumentInfoComponent } from "../../components/instrument-info/instrument-info.component";
import { BackButtonService } from "@environment-services-lib";
import { StopOrderFormComponent } from "../../components/order-forms/stop-order-form/stop-order-form.component";
import { LimitOrderFormComponent } from "../../components/order-forms/limit-order-form/limit-order-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { CommonParametersService } from "../../sevices/commom-parameters/common-parameters.service";
import { of, switchMap, take } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'tga-create-order',
  standalone: true,
  imports: [
    NzButtonComponent,
    SectionPanelComponent,
    SectionsComponent,
    NzTabSetComponent,
    NzTabComponent,
    InstrumentSelectComponent,
    InstrumentInfoComponent,
    StopOrderFormComponent,
    LimitOrderFormComponent,
    ReactiveFormsModule
  ],
  providers: [ CommonParametersService ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.less'
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  instrumentSelectControl = new FormControl<Instrument | null>(null)
  selectedInstrument: Instrument | null = null;

  constructor(
    private readonly backButtonService: BackButtonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly instrumentsService: InstrumentsService,
    private readonly commonParametersService: CommonParametersService
  ) {
  }

  ngOnInit() {
    this.backButtonService.onClick(this.onBackButtonCallback);
    this.backButtonService.show();

    this.getInitialInstrument();
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBackButtonCallback);
  }

  selectInstrument(instrument: Instrument | null) {
    this.selectedInstrument = instrument;
    this.commonParametersService.reset();
  }

  private onBackButtonCallback = () => {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.home);
    this.backButtonService.hide();
  }

  priceSelected(price: number) {
    this.commonParametersService.setParameters({ price });
  }

  private getInitialInstrument() {
    this.route.queryParams
      .pipe(
        take(1),
        switchMap(params => {
          const ticker = params['instrument']
          if (ticker == null) {
            return of(null);
          }

          return this.instrumentsService.getInstrument(this.getInstrumentKey(ticker))
        })
      )
      .subscribe(instrument => {
        if (instrument == null) {
          return;
        }

        this.instrumentSelectControl.setValue(instrument);
        this.selectedInstrument = instrument;
      })
  }

  private getInstrumentKey(ticker: string): InstrumentKey {
    const [exchange, symbol] = ticker.split(':');

    return { exchange, symbol }
  }
}
