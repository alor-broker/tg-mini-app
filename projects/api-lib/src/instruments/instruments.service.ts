import { Injectable } from '@angular/core';
import { ApiConfigProvider, ApiErrorsTracker, ApiRequestOptions, ApiResponse } from "@api-lib";
import { HttpClient } from "@angular/common/http";
import { BaseHttpApiService } from "../base-http-api.service";
import { Instrument, InstrumentKey, InstrumentResponse } from "./instruments-service.model";

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService extends BaseHttpApiService {

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

  getInstrument(instrument: InstrumentKey, options?: ApiRequestOptions): ApiResponse<Instrument> {
    return this.sendRequest<Instrument, InstrumentResponse>(
      (config) => this.httpClient.get<InstrumentResponse>(
        `${this.getInstrumentsUrl(config.apiUrl)}/${instrument.exchange}/${instrument.symbol}`
      ),
      options,
      (res) => ({
        symbol: res.symbol,
        shortName: res.shortname,
        exchange: res.exchange,
        description: res.description,
        instrumentGroup: res.board ?? res.primary_board,
        isin: res.ISIN,
        currency: res.currency,
        minstep: res.minstep ?? 0.01,
        pricestep: res.pricestep,
        lotsize: res.lotsize,
        cfiCode: res.cfiCode,
        type: res.type,
        marginbuy: res.marginbuy,
        marginsell: res.marginsell,
        expirationDate: res.cancellation,
        tradingStatus: res.tradingStatus
      })
    )
  }

  private getInstrumentsUrl(apiUrl: string) {
    return `${apiUrl}/md/v2/Securities`
  }
}
