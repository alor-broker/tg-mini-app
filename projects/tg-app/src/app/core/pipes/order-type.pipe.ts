import { Pipe, PipeTransform } from '@angular/core';
import { OrderType } from "@api-lib";

@Pipe({
  name: 'orderType',
  standalone: true
})
export class OrderTypePipe implements PipeTransform {

  transform(value: OrderType): string {
    switch (value) {
      case OrderType.Limit:
        return 'Лимитная';
      case OrderType.Market:
        return 'Рыночная';
      case OrderType.StopLimit:
        return 'Стоп-лимит';
      case OrderType.StopMarket:
        return 'Стоп';
      default:
        return '';
    }
  }
}
