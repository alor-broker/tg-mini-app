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
      (config) => this.getOrderRequest(order, portfolio, config, 'limit'),
      options
    )
  }

  submitStopMarketOrder(order: NewStopMarketOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.getOrderRequest(order, portfolio, config, 'stop'),
      options
    )
  }

  submitStopLimitOrder(order: NewStopLimitOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.getOrderRequest(order, portfolio, config, 'stopLimit'),
      options
    )
  }

  private getOrderRequest(
    order: NewLimitOrder | NewStopMarketOrder | NewStopLimitOrder,
    portfolio: string,
    config: ApiConfig,
    orderType: string
  ) {
    return this.httpClient.post<NewOrderResponse>(
      `${this.getBaseOrdersUrl(config)}/${orderType}`,
      {
        ...order,
        user: { portfolio }
      },
      {
        headers: {
          'X-REQID': GuidGenerator.newGuid()
        }
      }
    )
  }

  private getBaseOrdersUrl(config: ApiConfig) {
    return `${config.apiUrl}/commandapi/warptrans/TRADE/v2/client/orders/actions`
  }
}
