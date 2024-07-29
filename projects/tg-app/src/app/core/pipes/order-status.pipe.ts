import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from "@api-lib";

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderStatus): string {
    switch (value) {
      case OrderStatus.Canceled:
        return 'Отменена';
      case OrderStatus.Filled:
        return 'Исполнена';
      case OrderStatus.Working:
        return 'В работе';
      case OrderStatus.Rejected:
        return 'Отложена';
      default:
        return '';
    }
  }
}
