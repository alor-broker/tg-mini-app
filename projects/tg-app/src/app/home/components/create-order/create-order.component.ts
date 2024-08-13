import { Component } from '@angular/core';
import { LimitOrderComponent } from "./limit-order/limit-order.component";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { Instrument } from "@api-lib";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { NzTabComponent, NzTabSetComponent } from "ng-zorro-antd/tabs";
import { InstrumentSelectComponent } from "./instrument-select/instrument-select.component";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { InstrumentIconSourceService } from "../../../core/services/instrument-icon-source.service";

@Component({
  selector: 'tga-create-order',
  standalone: true,
  imports: [
    LimitOrderComponent,
    NzButtonComponent,
    SectionPanelComponent,
    SectionsComponent,
    NzTabSetComponent,
    NzTabComponent,
    InstrumentSelectComponent,
    NzAvatarComponent
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.less'
})
export class CreateOrderComponent {

  selectedInstrument: Instrument | null = null;

  constructor(
    private readonly instrumentIconSourceService: InstrumentIconSourceService
  ) {
  }

  selectInstrument(instrument: Instrument | null) {
    this.selectedInstrument = instrument;
  }

  getIconUrl(symbol: string): string {
    return this.instrumentIconSourceService.getIconUrl(symbol);
  }
}
