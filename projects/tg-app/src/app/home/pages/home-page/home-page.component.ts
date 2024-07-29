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

@Component({
  selector: 'tga-home-page',
  standalone: true,
  imports: [
    PortfolioSelectionComponent,
    PortfolioEvaluationComponent,
    InvestmentIdeasComponent,
    AsyncPipe,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzIconDirective
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
