import { Injectable } from '@angular/core';
import { BaseHttpApiService } from "../base-http-api.service";
import {
  ApiConfig,
  ApiConfigProvider,
  ApiErrorsTracker,
  ApiRequestOptions,
  ApiResponse,
  NewLimitOrder,
  NewOrderResponse, NewStopLimitOrder, NewStopMarketOrder
} from "@api-lib";
import { HttpClient } from "@angular/common/http";
import { GuidGenerator } from "../utils/guid";

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

  submitLimitOrder(order: NewLimitOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.httpClient.post<NewOrderResponse>(
        `${this.getBaseOrdersUrl(config)}/limit`,
        {
          ...order,
          user: { portfolio }
        },
        {
          headers: {
            'X-REQID': GuidGenerator.newGuid()
          }
        }
      ),
      options
    )
  }

  submitStopMarketOrder(order: NewStopMarketOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.httpClient.post<NewOrderResponse>(
        `${this.getBaseOrdersUrl(config)}/stop`,
        {
          ...order,
          user: { portfolio }
        },
        {
          headers: {
            'X-REQID': GuidGenerator.newGuid()
          }
        }
      ),
      options
    )
  }

  submitStopLimitOrder(order: NewStopLimitOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.httpClient.post<NewOrderResponse>(
        `${this.getBaseOrdersUrl(config)}/stopLimit`,
        {
          ...order,
          user: { portfolio }
        },
        {
          headers: {
            'X-REQID': GuidGenerator.newGuid()
          }
        }
      ),
      options
    )
  }

  private getBaseOrdersUrl(config: ApiConfig) {
    return `${config.apiUrl}/commandapi/warptrans/TRADE/v2/client/orders/actions`
  }
}
