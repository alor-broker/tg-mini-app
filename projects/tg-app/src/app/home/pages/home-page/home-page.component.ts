import { Component } from '@angular/core';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent
} from "ng-zorro-antd/collapse";

@Component({
  selector: 'tga-home-page',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent {

}
