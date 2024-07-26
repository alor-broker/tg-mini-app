import {
  Component,
  OnInit
} from '@angular/core';
import { SelectedPortfolioDataContextService } from "../../services/selected-portfolio-data-context.service";
import { Observable } from "rxjs";
import { Portfolio } from "../../../core/models/porfolio.models";
import { NzButtonComponent } from "ng-zorro-antd/button";
import {
  NzDropdownButtonDirective,
  NzDropDownDirective,
  NzDropdownMenuComponent
} from "ng-zorro-antd/dropdown";
import {
  NzMenuDirective,
  NzMenuItemComponent
} from "ng-zorro-antd/menu";
import { AsyncPipe } from "@angular/common";
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-portfolio-selection',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzDropdownButtonDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    AsyncPipe,
    NzIconDirective
  ],
  templateUrl: './portfolio-selection.component.html',
  styleUrl: './portfolio-selection.component.less'
})
export class PortfolioSelectionComponent implements OnInit {
  allPortfolios$!: Observable<Portfolio[]>;
  selectedPortfolio$!: Observable<Portfolio>;

  constructor(private readonly selectedPortfolioDataContextService: SelectedPortfolioDataContextService) {
  }

  ngOnInit(): void {
    this.allPortfolios$ = this.selectedPortfolioDataContextService.portfolios$;
    this.selectedPortfolio$ = this.selectedPortfolioDataContextService.selectedPortfolio$;
  }

  changeSelection(newSelection: Portfolio): void {
    this.selectedPortfolioDataContextService.selectPortfolio(newSelection);
  }
}
