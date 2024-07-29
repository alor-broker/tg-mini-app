import { Component, OnInit } from '@angular/core';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent
} from "ng-zorro-antd/collapse";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzDrawerComponent, NzDrawerContentDirective } from "ng-zorro-antd/drawer";
import { InvestmentIdeasComponent } from "../../components/investment-ideas/investment-ideas.component";
import { BehaviorSubject } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { BackButtonService } from "@environment-services-lib";
import { PortfolioSelectionComponent } from "../../components/portfolio-selection/portfolio-selection.component";
import { PortfolioEvaluationComponent } from "../../components/portfolio-evaluation/portfolio-evaluation.component";
import { PositionsListComponent } from "../../components/positions-list/positions-list.component";
import { TradesListComponent } from "../../components/trades-list/trades-list.component";
import { OrdersListComponent } from "../../components/orders-list/orders-list.component";

@Component({
  selector: 'tga-home-page',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzIconDirective,
    AsyncPipe,
    PortfolioSelectionComponent,
    PortfolioEvaluationComponent,
    InvestmentIdeasComponent,
    PortfolioSelectionComponent,
    PortfolioEvaluationComponent,
    PositionsListComponent,
    TradesListComponent,
    OrdersListComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent implements OnInit {

  investmentIdeasVisible$ = new BehaviorSubject(false);
  isBackButtonAvailable = false;

  constructor(
    private readonly backButtonService: BackButtonService
  ) {
  }

  ngOnInit() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;
  }

  changeInvestmentIdeasVisibility(isVisible: boolean) {
    this.investmentIdeasVisible$.next(isVisible);
  }
}
