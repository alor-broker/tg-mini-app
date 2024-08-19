import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { Instrument } from "@api-lib";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { NzTabComponent, NzTabSetComponent } from "ng-zorro-antd/tabs";
import { InstrumentSelectComponent } from "./instrument-select/instrument-select.component";
import { InstrumentInfoComponent } from "./instrument-info/instrument-info.component";
import { BackButtonService } from "@environment-services-lib";
import { StopOrderFormComponent } from "./order-forms/stop-order-form/stop-order-form.component";
import { LimitOrderFormComponent } from "./order-forms/limit-order-form/limit-order-form.component";

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
    LimitOrderFormComponent
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.less'
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  @Output() onBack = new EventEmitter();

  selectedInstrument: Instrument | null = null;

  constructor(
    private readonly backButtonService: BackButtonService
  ) {
  }

  ngOnInit() {
    this.backButtonService.onClick(this.onBackButtonCallback);
    this.backButtonService.show();
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBackButtonCallback);
  }

  selectInstrument(instrument: Instrument | null) {
    this.selectedInstrument = instrument;
  }

  private onBackButtonCallback = () => {
    this.onBack.emit();
    this.backButtonService.hide();
  }
}
