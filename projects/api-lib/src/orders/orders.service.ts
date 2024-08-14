import { Injectable } from '@angular/core';
import { BaseHttpApiService } from "../base-http-api.service";
import {
  ApiConfigProvider,
  ApiErrorsTracker,
  ApiResponse,
  NewLimitOrder,
  NewOrderResponse
} from "@api-lib";
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

  submitLimitOrder(order: NewLimitOrder, portfolio: string): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.httpClient.post<NewOrderResponse>(
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
