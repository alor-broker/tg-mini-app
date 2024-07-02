import { Injectable } from '@angular/core';
import { NewLimitOrder, SubmitOrderResult } from "../../models/orders/new-limit-order.model";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { GuidHelper } from "../../utils/guid.helper";

@Injectable({
  providedIn: 'root'
})
export class OrderCommandService {

  private readonly baseUrl = environment.apiUrl + '/commandapi/warptrans/TRADE/v2/client/orders/actions';

  constructor(
    private readonly http: HttpClient
  ) { }

  submitLimitOrder(order: NewLimitOrder, portfolio: string): Observable<SubmitOrderResult> {
    const body = {
      ...order,
      user: {
        portfolio: portfolio
      }
    };

    const options = {
      headers: {
        'X-ALOR-REQID': GuidHelper.generate(),
        'X-ALOR-ORIGINATOR': 'astras'
      }
    };

    return this.http.post(`${this.baseUrl}/limit`, body, options).pipe(
      catchError(() => of(null)),
      map(response => ({
        isSuccess: response?.orderNumber != null,
        orderNumber: response?.orderNumber
      } as SubmitOrderResult))
    );
  }
}
