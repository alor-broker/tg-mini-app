import { Pipe, PipeTransform } from '@angular/core';
import { Side } from "@api-lib";

@Pipe({
  name: 'orderSide',
  standalone: true
})
export class OrderSidePipe implements PipeTransform {

  transform(value: Side): string {
    switch (value) {
      case Side.Buy:
        return 'Покупка';
      case Side.Sell:
        return 'Продажа';
      default:
        return '';
    }
  }
}
