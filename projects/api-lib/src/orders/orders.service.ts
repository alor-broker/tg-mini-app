import { Injectable } from '@angular/core';
import { BaseHttpApiService } from "../base-http-api.service";
import { ApiConfigProvider, ApiErrorsTracker, NewLimitOrder } from "@api-lib";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseHttpApiService{

  constructor(
    configProvider: ApiConfigProvider,
    errorsTracker: ApiErrorsTracker,
    httpClient: HttpClient
  ) {
    super(
      configProvider,
      errorsTracker,
      httpClient
    );
  }

  submitLimitOrder(order: NewLimitOrder, portfolio: string) {
    return this.sendRequest(
      (config) => this.httpClient.post(
        `${config.apiUrl}/commandapi/warptrans/TRADE/v2/client/orders/actions/limit`,
        {
          ...order,
          user: { portfolio }
        },
        {
          headers: {
            'X-REQID': new Date().getTime().toString()
          }
        }
      ),
    )
  }
}
