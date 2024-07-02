import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Order, StopOrderResponse } from "../../models/orders/orders.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly baseUrl = environment.apiUrl + '/md/v2/Clients';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getCurrentSessionOrders(portfolio: string, exchange: string): Observable<Order[] | null> {
    return this.http.get<Order[]>(`${ this.baseUrl }/${ exchange }/${ portfolio }/orders`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getCurrentSessionStopOrders(portfolio: string, exchange: string): Observable<StopOrderResponse[] | null> {
    return this.http.get<StopOrderResponse[]>(`${ this.baseUrl }/${ exchange }/${ portfolio }/stoporders`)
      .pipe(
        catchError(() => of(null))
      );
  }
}
