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
import { OrderItemComponent } from "../../components/order-item/order-item.component";

enum SelectedItemType {
  InvestingIdeas = 'investingIdeas',
  Order = 'order'
}

interface DrawerContext {
  isVisible: boolean,
  itemType?: SelectedItemType,
  data?: any
}

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
    OrderItemComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent implements OnInit {

  drawerContext$ = new BehaviorSubject<DrawerContext>({ isVisible: false })
  isBackButtonAvailable = false;
  selectedItemType = SelectedItemType

  constructor(
    private readonly backButtonService: BackButtonService
  ) {
  }

  ngOnInit() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;
  }

  changeDrawerVisibility(isVisible: boolean, itemType?: SelectedItemType, data?: any) {
    if (!isVisible) {
      this.drawerContext$.next({ isVisible: false });
      return;
    }

    switch (itemType) {
      case SelectedItemType.InvestingIdeas:
        this.drawerContext$.next({ isVisible, itemType  });
        break;
      case SelectedItemType.Order:
        this.drawerContext$.next({ isVisible, itemType, data  });
        break;
    }
  }

  protected readonly SelectedItemType = SelectedItemType;
}
