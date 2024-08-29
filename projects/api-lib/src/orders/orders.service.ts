import { Injectable } from '@angular/core';
import { BaseHttpApiService } from "../base-http-api.service";
import {
  ApiConfig,
  ApiConfigProvider,
  ApiErrorsTracker,
  ApiRequestOptions,
  ApiResponse,
  CancelOrderResponse,
  NewLimitOrder,
  NewMarketOrder,
  NewOrderResponse,
  NewStopLimitOrder,
  NewStopMarketOrder
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

  submitMarketOrder(order: NewMarketOrder, portfolio: string, options?: ApiRequestOptions): ApiResponse<NewOrderResponse> {
    return this.sendRequest<NewOrderResponse>(
      (config) => this.getOrderRequest(order, portfolio, config, 'market'),
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

  cancelOrder(
    orderId: string,
    params: { portfolio: string, exchange: string, stop: boolean },
    options?: ApiRequestOptions
  ): ApiResponse<CancelOrderResponse> {
    return this.sendRequest<CancelOrderResponse>(
      (config) => this.httpClient.delete<CancelOrderResponse>(
        `${this.getBaseOrdersUrl(config)}/${orderId}`,
        {
          params: {
            ...params,
            jsonResponse: true
          }
        }
      ),
      options
    );
  }

  private getOrderRequest(
    order: NewLimitOrder | NewMarketOrder | NewStopMarketOrder | NewStopLimitOrder,
    portfolio: string,
    config: ApiConfig,
    orderType: string
  ) {
    return this.httpClient.post<NewOrderResponse>(
      `${this.getBaseOrdersActionsUrl(config)}/${orderType}`,
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

  private getBaseOrdersActionsUrl(config: ApiConfig) {
    return `${this.getBaseOrdersUrl(config)}/actions`
  }

  private getBaseOrdersUrl(config: ApiConfig) {
    return `${config.apiUrl}/commandapi/warptrans/TRADE/v2/client/orders`
  }
}
