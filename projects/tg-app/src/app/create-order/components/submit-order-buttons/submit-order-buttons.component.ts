import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { Side } from "@api-lib";

@Component({
  selector: 'tga-submit-order-buttons',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './submit-order-buttons.component.html',
  styleUrl: './submit-order-buttons.component.less'
})
export class SubmitOrderButtonsComponent {

  @Input() disabled = false;

  side = Side;

  @Output() onSubmit = new EventEmitter<Side>();
}
