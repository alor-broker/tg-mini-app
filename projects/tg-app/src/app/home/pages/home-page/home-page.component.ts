import { Component } from '@angular/core';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent
} from "ng-zorro-antd/collapse";
import { PortfolioSelectionComponent } from "../../components/portfolio-selection/portfolio-selection.component";
import { PortfolioEvaluationComponent } from "../../components/portfolio-evaluation/portfolio-evaluation.component";
import { PositionsListComponent } from "../../components/positions-list/positions-list.component";
import { TradesListComponent } from "../../components/trades-list/trades-list.component";
import { OrdersListComponent } from "../../components/orders-list/orders-list.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";

@Component({
  selector: 'tga-home-page',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    PortfolioSelectionComponent,
    PortfolioEvaluationComponent,
    PositionsListComponent,
    TradesListComponent,
    OrdersListComponent,
    SectionsComponent,
    SectionPanelComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent {

}
